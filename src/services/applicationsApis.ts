import { TId } from '../const/interface';
import axiosClient from './axiosClients';

const applicationApis = {
  getApplications: () => axiosClient.get('/applications'),
  getApplication: (id: TId) => axiosClient.get(`/applications/${id}`),
  deleteApplication: (id: TId) => axiosClient.delete(`/applications/${id}`),
  submitApplication: (data: any, isDraft = false) =>
    axiosClient.post(`/applications`, { ...data, draft: isDraft }),
  updateApplication: (data: any, isDraft = false) =>
    axiosClient.put(`/applications/${data.application_id}/docs`, {
      ...data,
      draft: isDraft,
    }),
  updateAppPayment: (id: TId, data: any) =>
    axiosClient.put(`/applications/${id}/payment`, data),
  confirmAppPayment: (id: TId, payload: any) =>
    axiosClient.put(`/applications/${id}/confirm`, payload),
};

export default applicationApis;
