export class CrossSideFactory {

  /**
   * define the dependencies of this module
   */
  dependencies = [];

  /**
   * create the module instance
   * - executed on both server and client
   * - required
   */
  create(ctx, dependencies) {
    return {};
  }

  /**
   * serialize the module to pure object
   * - executed on server
   */
  serialize(module) {
    return module;
  }

  /**
   * construct the module base on the serialized object
   * - executed on client
   * - default behavior: (data) => data
   */
  deserialize(data) {
    return data;
  }

  static createFactory(factoryFunction) {
    return new (class extends CrossSideFactory{
      create(ctx, module) {
        return factoryFunction(ctx, module);
      }
    });
  }
}
