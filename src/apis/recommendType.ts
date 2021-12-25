import { request } from "../utils/request";

export const getRecommendType = ({
  type
}: {
    type?: number;
}) => 
    request(
        `/dj/recommend/type?type=${type}`
      ) as Promise<any>;

    // console.log(`/dj/program/toplist?limit=${limit}`) 
