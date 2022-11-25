import { TId } from '../const/interface';
import axiosClient from './axiosClients';

const userApis = {
  getUsers: () => axiosClient.get('/users'),
  getUserRoles: () => axiosClient.get('/roles'),
  getUser: (id: TId) => axiosClient.get(`/users/${id}`),
  updateUser: (id: TId, payload: any) =>
    axiosClient.put(`/users/${id}`, payload),
  createUser: (payload: any) => axiosClient.post('/users', payload),
  deleteUser: (id: TId) => axiosClient.delete(`/users/${id}`),
};

export default userApis;
