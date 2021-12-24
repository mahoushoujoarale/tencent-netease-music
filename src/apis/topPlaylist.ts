import {request} from "../utils/request"
export const getTopPlayList=()=>
    request("/top/playlist") as Promise<any>;
export const getPlaylistTag=()=>
    request("/playlist/catlist") as Promise<any>;
