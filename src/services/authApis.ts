import axiosClient from './axiosClients';

const authApis = {
  postLogin: (payload: any) => axiosClient.post('/login', payload),
  getCurrentUser: () => axiosClient.get('/users/current'),
};

export default authApis;
