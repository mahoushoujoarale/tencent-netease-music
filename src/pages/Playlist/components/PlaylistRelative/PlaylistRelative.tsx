import "./index.less";
import { getRelatedPlaylist, getPlaylistDetail } from "@/apis/playlist";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DownloadApps from "@/components/DownloadApps/DownloadApps";

const PlaylistRelative = () => {
  const playlistID = useLocation().search.slice(4);
  const [subscribers, setSubscribers] = useState([]);
  const [relatedPlaylistList, setRelatedPlaylistList] = useState([]);

  useEffect(() => {
    async function getData() {
      const { playlists } = await getRelatedPlaylist({
        id: playlistID,
      });

      setRelatedPlaylistList(playlists);
    }
    getData();
  }, [playlistID]);

  useEffect(() => {
    async function getData() {
      const {
        playlist: { subscribers },
      } = await getPlaylistDetail({
        id: playlistID,
      });

      setSubscribers(subscribers);
    }
    getData();
  }, [playlistID]);

  return (
    <div className="playlist-relative">
      <div className="title">喜欢这个歌单的人</div>
      <div className="playlist-subscriber-container">
        {subscribers.map(
          (item: { userId: string; nickname: string; avatarUrl: string }) => (
            <Link
              to={`/user/home?id=${item.userId}`}
              className="user-photo"
              key={item.userId}
              title={item.nickname}
            >
              <img src={item.avatarUrl} alt="头像" />
            </Link>
          )
        )}
      </div>
      <div className="title">热门歌单</div>
      <div className="related-playlist-container">
        {relatedPlaylistList.map(
          (item: {
            name: string;
            id: number;
            creator: { nickname: string; userId: string };
            coverImgUrl: string;
          }) => (
            <div className="item" key={item.id}>
              <Link to={`/playlist?id=${item.id}`} className="cover">
                <img src={item.coverImgUrl} alt="封面" />
              </Link>
              <div className="desc">
                <Link to={`/playlist?id=${item.id}`} className="simi-list">
                  {item.name}
                </Link>
                <span>by</span>
                <Link
                  to={`/user/home?id=${item.creator.userId}`}
                  className="list-creator"
                >
                  {item.creator.nickname}
                </Link>
              </div>
            </div>
          )
        )}
      </div>
      <DownloadApps />
    </div>
  );
};

export default PlaylistRelative;
