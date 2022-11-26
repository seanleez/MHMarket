import axios from 'axios';

// for local
const baseURL = 'http://103.162.20.141:8000/api/v2';

const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
  },
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
    throw (
      (error as any)?.response?.data?.error_description ??
      (error as any).message
    );
  }
);

export default axiosClient;
