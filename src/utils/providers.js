import _ from 'lodash';
import apiClientFactory from '../api/client.factory';

export default {
  env: () => {
    return _.pick(process.env, [
      'NODE_ENV',
      'API_URL',
      'SERVER_URL',
    ]);
  },
  client: apiClientFactory,
  csrf: (ctx) => {
    return { token: ctx.req.csrfToken() };
  }
};
