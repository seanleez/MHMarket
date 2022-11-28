import { TId } from '../const/interface';
import axiosClient from './axiosClients';

const roleApis = {
  getRoles: () => axiosClient.get('/roles'),
  getRole: (id: TId) => axiosClient.get(`/roles/${id}`),
  updateRole: (id: TId, payload: any) =>
    axiosClient.put(`/roles/${id}`, payload),
  createRole: (payload: any) => axiosClient.post('/roles', payload),
  deleteRole: (id: TId) => axiosClient.delete(`/roles/${id}`),

  getPermissionCategories: () => axiosClient.get('/permissions/categories'),
};

export default roleApis;
