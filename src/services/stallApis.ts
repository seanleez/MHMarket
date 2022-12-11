import { TId } from '../const/interface';
import axiosClient from './axiosClients';

const stallApis = {
  getListStalls: (id: TId) => axiosClient.get(`/floors/${id}?draft=true`),
  updateStall: (id: TId, payload: any) =>
    axiosClient.put(`/stalls/${id}/position`, payload),
  createStall: (payload: any) => axiosClient.post(`/stalls`, payload),
  deleteStall: (id: TId) => axiosClient.delete(`/stalls/${id}`),
  editDetailStall: (id: TId, payload: any) =>
    axiosClient.put(`/stalls/${id}/metadata`, payload),
  getStallInfo: (params: Record<any, any>) => axiosClient.get(`/stalls/info`, { params })
};

export default stallApis;
