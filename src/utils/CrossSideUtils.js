import apiClientFactory from '../api/client.factory';
import _ from 'lodash';
import {CrossSideFactory} from "./CrossSideFactory";

let instance = null;

class CrossSideUtils {

  /**
   *
   * @param {*} ctx
   * @param {*} [factories] - can be optional if initialized before
   * @returns {CrossSideUtils}
   */
  static getInstance(ctx, factories) {
    const isServer = typeof window === 'undefined';

    if (isServer) {
      if (!ctx.crossSideUtils) {
        ctx.crossSideUtils = new CrossSideUtils(ctx, factories);
      }
      return ctx.crossSideUtils;
    } else {
      if (instance === null) {
        instance = new CrossSideUtils(ctx, factories);
      }
      return instance;
    }
  }

  constructor(ctx, factories) {
    const isServer = typeof window === 'undefined';
    const shouldDeserialize = !isServer && !!ctx.provides;
    this.ctx = ctx;
    this.isServer = isServer;
    this.ctx.provides = this.ctx.provides || {};
    this.ctx.factories = this.ctx.factories || {};
    for (const moduleName of Object.keys(factories)) {
      let factory = factories[moduleName];
      if (typeof factory === 'function') {
        factory = CrossSideFactory.createFactory(factory);
      }
      this.ctx.factories[moduleName] = factory;
    }

    for (const moduleName of Object.keys(factories)) {
      this.provide(moduleName, factories[moduleName]);
    }

    if (shouldDeserialize) {
      this.deserialize();
    }
  }


  /**
   * called on client side
   */
  deserialize() {
    const { provides, factories } = this.ctx;
    for (const moduleName of Object.keys(factories)) {
      const dependencies = {};

      for (const dependency of factories[moduleName].dependencies) {
        dependencies[dependency] = provides[dependency];
      }

      provides[moduleName] = factories[moduleName].deserialize(provides[moduleName], dependencies);
    }
  }

  serialize() {
    const { provides, factories } = this.ctx;
    const result = {};
    for (const moduleName of Object.keys(factories)) {
      result[moduleName] = factories[moduleName].serialize(provides[moduleName]);
    }
    return result;
  }

  providing = {};
  /**
   * Provide a module from server to client side
   *
   * @param moduleName
   * @param {Function | CrossSideFactory} factory
   */
  provide(moduleName, factory) {
    this.providing[moduleName] = true;

    // convert factory function to standard factory
    if (typeof factory === 'function') {
      factory = CrossSideFactory.createFactory(factory);
    }
    this.ctx.factories[moduleName] = factory;

    const module = this.get(moduleName);
    if (module) {
      delete this.providing[moduleName];
      return module;
    }

    const dependencies = {};
    for (const dependency of factory.dependencies) {
      if (this.providing[dependency]) {
        console.error('circular dependency detected, related modules: ' + Object.keys(this.providing).join(', '));
        break;
      }
      dependencies[dependency] = this.provide(dependency, this.ctx.factories[dependency]);
    }

    if (this.isServer) {
      this.ctx.provides[moduleName] = factory.create(this.ctx, dependencies);
    }

    delete this.providing[moduleName];
    return this.ctx.provides[moduleName];
  }

  get(moduleName) {
    return this.ctx.provides[moduleName];
  }
  getFactory(moduleName) {
    return this.ctx.factories[moduleName];
  }
}

export default CrossSideUtils;
