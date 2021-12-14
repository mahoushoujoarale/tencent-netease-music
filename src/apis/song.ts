import { request } from "../utils/request";

export const getLyric = ({ id }: { id: string }) =>
  request(`/lyric?id=${id}`) as Promise<any>;

export const getSongComment = ({
  id,
  offset,
}: {
  id: string;
  offset?: number;
}) =>
  request(
    `/comment/music?id=${id}${offset ? "&offset=" + offset : ""}`
  ) as Promise<any>;

export const getSongDetail = ({ ids }: { ids: string }) =>
  request(`/song/detail?ids=${ids}`) as Promise<any>;

export const getSimiList = ({ id }: { id: string }) =>
  request(`/simi/playlist?id=${id}`) as Promise<any>;

export const getSimiSongs = ({ id }: { id: string }) =>
  request(`/simi/song?id=${id}`) as Promise<any>;

export const getSongUrl = ({ id }: { id: string }) =>
  request(`/song/url?id=${id}`) as Promise<any>;

export const getSongInList = ({ id, limit }: { id: string; limit?: number }) =>
  request(
    `/playlist/track/all?id=${id}${limit ? "&limit=" + limit : ""}`
  ) as Promise<any>;
