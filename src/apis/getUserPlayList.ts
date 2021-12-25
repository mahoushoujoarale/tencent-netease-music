import { request } from "../utils/request";

export const getUserPlayList = ({id}:{id : string}) =>
  request(`/user/playlist?uid=${id}`) as Promise<any>;

