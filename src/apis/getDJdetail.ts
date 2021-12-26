import { request } from "../utils/request";

export const getDJdetail = ({id}:{id : string}) =>
  request(`/dj/detail?rid=${id}`) as Promise<any>;

  export const getDJProgram = (
    {id}:{id : string},
    {limit}: {limit: string}) =>
  request(`/dj/program?rid=${id}&limit=${limit}`) as Promise<any>;

  export const getRecommendDJprogram = () => 
    request(`/program/recommend`) as Promise<any>

    export const getPersonalizedDjprogram = () => 
    request(`/personalized/djprogram`) as Promise<any>

    export const getRecommendCategry = () => 
    request(`/dj/category/recommend`) as Promise<any>



  



