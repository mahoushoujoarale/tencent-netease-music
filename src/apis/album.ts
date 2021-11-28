import { request } from "../utils/request";

export const getAlbumComment = ({
  id,
  offset,
}: {
  id: string;
  offset?: number;
}) =>
  request(
    `/comment/album?id=${id}${offset ? "&offset=" + offset : ""}`
  ) as Promise<any>;

export const getAlbumDetail = ({ id }: { id: string }) =>
  request(`/album?id=${id}`) as Promise<any>;

export const getArtistAlbum = ({ id }: { id: string }) =>
  request(`/artist/album?id=${id}&limit=5`) as Promise<any>;
