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

export {
  serializeParams
}

export default hatchlessClient;
