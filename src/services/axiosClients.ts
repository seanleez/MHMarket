import axios from 'axios';

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`,
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
