import apiClientFactory from '../api/client.factory';
import _ from 'lodash';

// This store should only access on client side
const clientSideStore = {

};

export default clientSideStore;

export function getEnvironment() {
  if (typeof window === 'undefined') {
    return _.pick(process.env, [
      'API_URL',
      'SERVER_URL',
    ]);
  } else {
    return window.__DEV__;
  }
}
export function getApiClient(ctx) {
  if (!!ctx.req) {
    return apiClientFactory.create(ctx);
  } else {
    clientSideStore.client = clientSideStore.client || apiClientFactory.create(ctx);
    return clientSideStore.client;
  }
}
