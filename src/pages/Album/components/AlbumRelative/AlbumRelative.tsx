import "./index.less";
import { getArtistAlbum, getAlbumDetail } from "@/apis/album";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DownloadApps from "@/components/DownloadApps/DownloadApps";
import { formatTime } from "@/utils";

const AlbumRelative = () => {
  const albumID = useLocation().search.slice(4);
  const [artistID, setArtistID] = useState("");
  const [artistAlbumList, setArtistAlbumList] = useState([]);

  useEffect(() => {
    async function getData() {
      const {
        album: {
          artist: { id },
        },
      } = await getAlbumDetail({ id: albumID });
      setArtistID(id);
      const { hotAlbums } = await getArtistAlbum({
        id: id,
      });

      setArtistAlbumList(hotAlbums);
    }
    getData();
  }, [albumID]);

  return (
    <div className="album-relative">
      <div className="artist-list-container">
        <div className="title">
          <div>Ta的其他热门专辑</div>
          <Link to={`/artist/album?id=${artistID}`} className="all-albums">
            全部&gt;
          </Link>
        </div>
        {artistAlbumList.map(
          (item: {
            name: string;
            id: number;
            publishTime: string;
            picUrl: string;
          }) => (
            <div className="item" key={item.id}>
              <Link to={`/album?id=${item.id}`} className="cover">
                <img src={item.picUrl} alt="封面" />
              </Link>
              <div className="desc">
                <Link to={`/album?id=${item.id}`} className="simi-list">
                  {item.name}
                </Link>
                <div>{formatTime(item.publishTime, 1)}</div>
              </div>
            </div>
          )
        )}
      </div>
      <DownloadApps />
      <Link to={`/wiki/album?albumId=${albumID}`} className="add-more-info">
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

export default AlbumRelative;
