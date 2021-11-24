import { request } from "../utils/request";

export const getLyric = ({ id }: { id: string }) =>
  request(`/lyric?id=${id}`) as Promise<any>;

export const getSongComment = ({ id }: { id: string }) =>
  request(`/comment/music?id=${id}`) as Promise<any>;

export const getSongDetail = ({ ids }: { ids: string }) =>
  request(`/song/detail?ids=${ids}`) as Promise<any>;

export const getSimiList = ({ id }: { id: string }) =>
  request(`/simi/playlist?id=${id}`) as Promise<any>;

export const getSimiSongs = ({ id }: { id: string }) =>
  request(`/simi/song?id=${id}`) as Promise<any>;
