import { TId } from '../const/interface';
import axiosClient from './axiosClients';

const leaseApis = {
  getLeases: () => axiosClient.get('/applications/in-lease'),
  getLease: (id: TId) => axiosClient.get(`/applications/in-lease/${id}`),
  getTermination: (id: TId) =>
    axiosClient.get(`/applications/${id}/termination`),
  postTermination: (id: TId, payload: any) =>
    axiosClient.post(`/applications/${id}/termination`, payload),
  putCancelTermination: (id: TId, tid: TId, payload: any) =>
    axiosClient.put(`/applications/${id}/termination/${tid}`, payload),
};

export default leaseApis;
