import { request } from "../utils/request";

export const getRecommend = () =>
  request(`/program/recommend`) as Promise<any>;

