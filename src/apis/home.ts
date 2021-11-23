import { request } from "../utils/request";

export const getCarousel = () => request("/banner") as Promise<any>;
export const getRecommend = () => request("/personalized") as Promise<any>;
export const getAlbum = () => request("/album/newest") as Promise<any>;
export const getToplist = () => request("/toplist") as Promise<any>;
export const getToplistById = ({ id }: { id: number }) =>
  request("/playlist/detail", { id }) as Promise<any>;
export const getAnchor = () =>
  request("/dj/toplist/popular?limit=5") as Promise<any>;
export const getSinger = () => request("/top/artists?limit=5") as Promise<any>;
