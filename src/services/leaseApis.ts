import axiosClient from './axiosClients';

const leaseApis = {
  getLeases: () => axiosClient.get('/applications/in-lease'),
  getLease: (id: string | undefined) =>
    axiosClient.get(`/applications/in-lease/${id}`),
  getTermination: (id: string | undefined) =>
    axiosClient.get(`/applications/${id}/termination`),
  postTermination: (id: string | undefined, payload: any) =>
    axiosClient.post(`/applications/${id}/termination`, payload),
};

export default leaseApis;
