import axios from 'axios';
import qs from 'qs';

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

const serializeParams = (params) => {
  return qs.stringify(params, { arrayFormat: 'brackets' });
};

const hatchlessClient = axios.create({
  baseURL: baseApiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  paramsSerializer: serializeParams,
});

hatchlessClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

export {
  serializeParams
}

export default hatchlessClient;
