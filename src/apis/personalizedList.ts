import { request } from "../utils/request";

export const getPersonalizedList = () =>
  request(
    `/recommend/songs`
  ) as Promise<any>;

