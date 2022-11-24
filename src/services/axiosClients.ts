import axios from 'axios';
import { rootURL } from '../const/const';
// import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: rootURL,
  headers: {
    'content-type': 'application/json',
  },
  // paramsSerializer: (params: any) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config) =>
    // Handle token here ...
    config
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
