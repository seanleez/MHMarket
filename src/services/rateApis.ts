import { TId } from '../const/interface';
import axiosClient from './axiosClients';

const rateApis = {
  getRates: () => axiosClient.get('/rates'),
  getRate: (id: TId) => axiosClient.get(`/rates/${id}`),
  updateRate: (id: TId, payload: any) =>
    axiosClient.put(`/rates/${id}`, payload),
  createRate: (payload: any) => axiosClient.post('/rates', payload),
  deleteRate: (id: TId) => axiosClient.delete(`/rates/${id}`),
};

export default rateApis;
