import axiosClient from './axiosClients';

const authApis = {
  postLogin: (payload: any) => axiosClient.post('/login', payload),
};

export default authApis;
