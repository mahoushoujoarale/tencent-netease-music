import {request} from '../utils/request';

export const getCarousel = () => request("/banner");
export const getRecommend = () => request("/personalized");
export const getAlbum = () => request("/album/newest");
export const getToplist = () => request("/toplist");
export const getToplistById = ({id}) => request("/playlist/detail", {id});
export const getAnchor = () => request("/dj/toplist/popular?limit=5");
export const getSinger = () => request("/top/artists?limit=5");