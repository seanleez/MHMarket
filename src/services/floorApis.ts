import { TId } from '../const/interface';
import axiosClient from './axiosClients';

const floorApis = {
  getFloors: (id: TId) => axiosClient.get(`/markets/${id}/floors?draft=true`),
  createFloor: (payload: any) => axiosClient.post('/floors', payload),
  uploadFile: (payload: any) =>
    axiosClient.post('/files/upload', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  deleteFloor: (id: TId) => axiosClient.delete(`/floors/${id}`),
  updateFloor: (id: TId, payload: any) =>
    axiosClient.put(`/floors/${id}`, payload),
};

export default floorApis;
