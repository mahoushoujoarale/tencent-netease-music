import { request } from "../utils/request";

export const getUserAccount = () =>
  request(`/user/account?timerstamp=${new Date().getTime()}`) as Promise<any>;

export const getUserSubcount = () =>
  request(`/user/subcount?timerstamp=${new Date().getTime()}`) as Promise<any>;

export const getUserDetail = ({ id }: { id: string }) =>
  request(
    `/user/detail?uid=${id}&timerstamp=${new Date().getTime()}`
  ) as Promise<any>;

