import { TId } from '../const/interface';
import axiosClient from './axiosClients';

const applicationApis = {
  getApplications: () => axiosClient.get('/applications'),
  getApplication: (id: TId) => axiosClient.get(`/applications/${id}`),
  deleteApplication: (id: TId) => axiosClient.delete(`/applications/${id}`),
  submitApplication: (data: any, isDraft = false) => axiosClient.post(`/applications`, {
    data
  }, {
    params: {
      draft: isDraft
    }
  })
};

export default applicationApis;
