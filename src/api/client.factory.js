import axios from 'axios';
import CrossSideUtils from '../utils/CrossSideUtils';

/**
 * Authentication:
 * Cookie + csrf
 */

const apiClientFactory = ({ req }, { env, csrf }) => {
  const isServer = !!req;

  const client = axios.create();
  client.defaults.baseURL = env.API_URL;

  // Request interceptor
  const requestInterceptor = async (config) => {
    // if is requesting api server
    if (/^\/[a-zA-Z]/.test(config.url) || config.url.indexOf(env.API_URL) === 0) {
      config.params = config.params || {};
      config.headers = config.headers || {};
      config.headers['X-CSRF-Token'] = csrf.token;

      if (isServer) {
        config.headers.cookie = req.headers.cookie;
      } else {
        config.withCredentials = true;
      }

      return config;
    }
    return config;
  };

  client.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));

  // Response interceptor
  client.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    return Promise.reject(error)
  });

  return client;
};

export default {
  dependencies: ['env', 'csrf'],
  create: apiClientFactory,
  serialize: () => 1,
  deserialize: (data, dependencies) => apiClientFactory({}, dependencies),
};
