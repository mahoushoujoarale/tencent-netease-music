import { request } from "../utils/request";

export const getPlaylistComment = ({
  id,
  offset,
}: {
  id: string;
  offset?: number;
}) =>
  request(
    `/comment/playlist?id=${id}${offset ? "&offset=" + offset : ""}`
  ) as Promise<any>;

export const getPlaylistDetail = ({ id }: { id: string }) =>
  request(`/playlist/detail?id=${id}`) as Promise<any>;

export const getRelatedPlaylist = ({ id }: { id: string }) =>
  request(`/related/playlist?id=${id}`) as Promise<any>;
