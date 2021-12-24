import { request } from "../utils/request";

export const getToplist = ({
  limit
}: {
    limit?: number;
}) => 
    request(
        `/dj/program/toplist?limit=${limit}`
      ) as Promise<any>;

    // console.log(`/dj/program/toplist?limit=${limit}`) 
