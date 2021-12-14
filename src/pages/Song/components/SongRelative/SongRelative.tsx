import "./index.less";
import { getSimiList, getSimiSongs, getSongDetail } from "@/apis/song";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DownloadApps from "@/components/DownloadApps/DownloadApps";
import { action } from "mobx";
import store from "@/store";

interface DataI {
  name: string;
  artist: string;
  url: string;
  cover: string;
}

const SongRelative = () => {
  const songID = useLocation().search.slice(4);
  const [simiList, setSimiList] = useState([]);
  const [simiSongs, setSimiSongs] = useState([]);

  useEffect(() => {
    async function getData() {
      const { playlists } = await getSimiList({
        id: songID,
      });

      setSimiList(playlists);
    }
    getData();
  }, [songID]);

  useEffect(() => {
    async function getData() {
      const { songs } = await getSimiSongs({
        id: songID,
      });

      setSimiSongs(songs);
    }
    getData();
  }, [songID]);

  const addToPlaylist = async (id: string) => {
    const { songs } = await getSongDetail({
      ids: id,
    });

    const data: DataI = {
      name: songs[0].name,
      artist: songs[0].ar[0].name,
      url: `https://music.163.com/song/media/outer/url?id=${songs[0].id}.mp3`,
      cover: songs[0].al.picUrl,
    };

    store.addToPlaylist(data);
  };

  return (
    <div className="song-relative">
      <div className="simi-list-container">
        <div className="title">包含这首歌的歌单</div>
        {simiList.map(
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
      <div className="simi-songs-container">
        <div className="title">相似歌曲</div>
        {simiSongs.map((item: { id: string; name: string; artists: [] }) => (
          <div key={item.id} className="item">
            <div className="left">
              <Link to={`/song?id=${item.id}`} className="song-name">
                {item.name}
              </Link>
              <div className="song-singer">
                {item.artists.map((ast: { id: string; name: string }) => (
                  <Link
                    key={ast.id}
                    to={`artist?id=${ast.id}`}
                    className="artist-link"
                  >
                    {ast.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="right">
              <div
                className="play"
                onClick={action(() => addToPlaylist(item.id))}
              ></div>
              <div className="add-to-list"></div>
            </div>
          </div>
        ))}
      </div>
      <DownloadApps />
      <Link to={`/wiki/song?songId=${songID}&type=1`} className="add-more-info">
        补充或修改歌曲资料&gt;
      </Link>
      <Link
        to="/wiki/task-center/m/st/wiki/task-center/recommend"
        className="task-center"
      >
        用户wiki任务中心&gt;
      </Link>
    </div>
  );
};

export default SongRelative;
