import axiosClient from './axiosClients';

const authApis = {
  postLogin: (payload: any) => axiosClient.post('/login', payload),
  getCurrentUser: (token: string) =>
    axiosClient.get('/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default authApis;
