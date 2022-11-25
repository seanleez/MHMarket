import { TId } from '../const/interface';
import axiosClient from './axiosClients';

const submitAppApis = {
  getPublishedMarkets: () => axiosClient.get('/markets/published'),
  getFloorDetail: (id: TId) => axiosClient.get(`/markets/${id}/stalls/count`),
  getMarket: (id: TId) => axiosClient.get(`/markets/${id}?draft=false`),
  getPublishedMarket: (id: TId) =>
    axiosClient.get(`/markets/${id}/floors/published`),
  getPublishedFloor: (id: TId) => axiosClient.get(`/floors/${id}/published`),
};

export default submitAppApis;
