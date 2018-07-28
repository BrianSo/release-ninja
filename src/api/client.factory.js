import axios from 'axios';


/**
 * Authentication:
 * Cookie + csrf
 */

const apiClientFactory = ({ req }) => {
  const isServer = !!req;

  const client = axios.create();
  client.defaults.baseURL = process.env.API_URL;

  // Request interceptor
  const requestInterceptor = async (config) => {
    config.params = config.params || {};
    return config;
  };

  client.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));

  // Response interceptor
  client.interceptors.response.use((response) => {
    return response;
  }, (error) => Promise.reject(error));

  return client;
};

export default {
  create: apiClientFactory
};
