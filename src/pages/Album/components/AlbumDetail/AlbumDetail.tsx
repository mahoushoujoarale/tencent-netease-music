import "./index.less";
import { getAlbumDetail, getAlbumComment } from "@/apis/album";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import MakeComments from "@/components/MakeComments/MakeComments";
import Comments from "@/components/Comments/Comments";
import Pagination from "@/components/Pagination/Pagination";
import {
  addToPlaylist,
  formatDuration,
  formatTime,
  resetPlaylistByAlbum,
} from "@/utils";
import { action } from "mobx";
interface CommentInterface {
  beReplied: [];
  content: string;
  user: {
    nickname: string;
    userId: string;
    avatarUrl: string;
    avatarDetail: { identityIconUrl: string } | null;
    vipType: number;
  };
  time: string;
  commentId: string;
  likedCount: number;
}

const AlbumDetail = () => {
  const [albumDetail, setAlbumDetail] = useState({
    album: {
      picUrl: "",
      name: "",
      id: "",
      company: "",
      description: "",
      publishTime: "",
      alias: [],
      artist: { name: "", id: "" },
      info: { shareCount: 0, commentCount: 0 },
    },
    songs: [],
  });
  const [albumComment, setAlbumComment] = useState({
    total: 0,
    comments: [],
    hotComments: [],
  });
  const [desc, setDesc] = useState([]);
  const [fold, setFold] = useState(true);
  const [descHeight, setDescHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const albumID = useLocation().search.slice(4);

  useEffect(() => {
    setDescHeight(document.querySelector(".desc-content")!.clientHeight);
  }, [albumDetail]);

  useEffect(() => {
    async function getData() {
      const albums = await getAlbumDetail({
        id: albumID,
      });
      setDesc(albums.album.description.split(/\n+/g));
      setAlbumDetail(albums);
    }
    getData();
  }, [albumID]);

  useEffect(() => {
    async function getData() {
      const comments = await getAlbumComment({
        id: albumID,
      });

      setAlbumComment(comments);
    }
    getData();
  }, [albumID]);

  const onPageChange = (current: number) => {
    setAlbumComment({
      total: albumComment.total,
      comments: [],
      hotComments: [],
    });
    getAlbumComment({
      id: albumID,
      offset: current !== 1 ? current : undefined,
    }).then((res) => {
      setAlbumComment(res);
      setCurrentPage(current);
    });
  };

  return (
    <>
      <div className="album-detail">
        <div className="top">
          <div className="left">
            <div className="album-cover">
              <img src={albumDetail.album.picUrl} alt="封面" />
            </div>
          </div>
          <div className="right">
            <div className="album-name">{albumDetail.album.name}</div>
            <div className="album-alias">
              {(albumDetail.album.alias || []).map(
                (item: string, index: number) => (
                  <div className="album-alias-item" key={index}>
                    {item}
                  </div>
                )
              )}
            </div>
            <div className="album-singer">
              歌手：
              <Link to={`/artist?id=${albumDetail.album.artist.id}`}>
                {albumDetail.album.artist.name}
              </Link>
            </div>
            <div className="album-tips">
              发行时间：{formatTime(albumDetail.album.publishTime, 1)}
            </div>
            {albumDetail.album.company === "" ? (
              ""
            ) : (
              <div className="album-tips">
                发行公司：{albumDetail.album.company}
              </div>
            )}
            <div className="buttons">
              <div
                className="play-button"
                onClick={action(() => {
                  resetPlaylistByAlbum(albumDetail.album.id);
                })}
              >
                播放
              </div>
              <div className="add-to-list-button"></div>
              <div className="store-button">收藏</div>
              <div className="share-button">
                （{albumDetail.album.info.shareCount}）
              </div>
              <div className="download-button">下载</div>
              <div className="comment-button">
                （{albumDetail.album.info.commentCount}）
              </div>
            </div>
          </div>
        </div>
        <div className="album-desc" style={{ maxHeight: fold ? "" : "none" }}>
          <div className="desc-title">专辑介绍:</div>
          <div className="desc-content">
            {(desc || []).map((item: string, index: number) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <div
          className="fold-button"
          style={{
            display: descHeight > 132 ? "" : "none",
          }}
          onClick={() => setFold(!fold)}
        >
          {fold ? "展开" : "收起"}
          <span
            style={{ backgroundPosition: fold ? "" : "-45px -520px" }}
          ></span>
        </div>
        <div className="album-songs">
          <div className="title-bar">
            <div className="title">
              包含歌曲列表 <span>{albumDetail.songs.length}首歌</span>
            </div>
            <Link
              className="out-link"
              to={`/outchain/2/${albumDetail.album.id}`}
            >
              生成外链播放器
            </Link>
          </div>
          <table className="song-list">
            <thead>
              <tr>
                <th className="th1"></th>
                <th className="th2">歌曲列表</th>
                <th className="th3">时长</th>
                <th className="th4">歌手</th>
              </tr>
            </thead>
            <tbody>
              {(albumDetail.songs || []).map(
                (
                  item: {
                    name: string;
                    id: string;
                    alia: [];
                    ar: [];
                    dt: string;
                  },
                  index: number
                ) => (
                  <tr key={index}>
                    <td className="td1">
                      <div className="no">{index + 1}</div>
                      <span
                        onClick={action(() => addToPlaylist(item.id))}
                      ></span>
                    </td>
                    <td className="td2">
                      <Link to={`/song?id=${item.id}`} className="link-to-song">
                        {item.name}
                      </Link>
                      {item.alia
                        ? " - (" +
                          (item.alia || []).map(
                            (alia: string, aliaIndex: number) => (
                              <span key={aliaIndex}>{alia}</span>
                            )
                          ) +
                          ")"
                        : ""}
                    </td>
                    <td className="td3">
                      <div className="time-length">
                        {formatDuration(item.dt)}
                      </div>
                      <div className="options">
                        <div
                          className="add-button"
                          title="添加到播放列表"
                        ></div>
                        <div className="store-button" title="收藏"></div>
                        <div className="share-button" title="分享"></div>
                        <div className="download-button" title="下载"></div>
                      </div>
                    </td>
                    <td className="td4">
                      {(item.ar || []).map(
                        (
                          artist: { id: string; name: string; tns: [] },
                          arIndex: number
                        ) => (
                          <div key={arIndex}>
                            <Link
                              to={`/artist?id=${artist.id}`}
                              className="link-to-artist"
                            >
                              {artist.name}
                            </Link>
                            {artist.tns
                              ? " - (" +
                                (artist.tns || []).map(
                                  (tn: string, tnIndex: number) => (
                                    <span key={tnIndex}>{tn}</span>
                                  )
                                ) +
                                "）"
                              : ""}
                          </div>
                        )
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="album-comments">
        <MakeComments />

        {albumComment.hotComments ? (
          <>
            <div className="album-comment-title">精彩评论</div>
            {(albumComment.hotComments || []).map((item: CommentInterface) => (
              <Comments key={item.commentId} commentInfo={item} />
            ))}
          </>
        ) : (
          ""
        )}
        {albumComment.comments ? (
          <>
            <div
              className="album-comment-title"
              style={{
                display: albumComment.hotComments ? "" : "none",
              }}
            >
              最新评论(
              {albumComment.total})
            </div>
            {(albumComment.comments || []).map((item: CommentInterface) => (
              <Comments key={item.commentId} commentInfo={item} />
            ))}
            <div className="album-pagination">
              <Pagination
                pageSize={20}
                current={currentPage}
                total={albumComment.total}
                onPageChange={(current: number) => {
                  onPageChange(current);
                }}
              />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AlbumDetail;
