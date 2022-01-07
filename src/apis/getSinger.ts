import { request } from "../utils/request";

  export const getSinger = (
    {type}:{type : string},
    {area}: {area: string}) =>
  request(`/artist/list?type=${type}&area=${area}`) as Promise<any>;




  



