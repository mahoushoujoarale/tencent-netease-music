import "./index.less";
import { getPlaylistDetail, getPlaylistComment } from "@/apis/playlist";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import MakeComments from "@/components/MakeComments/MakeComments";
import Comments from "@/components/Comments/Comments";
import Pagination from "@/components/Pagination/Pagination";
import { formatDuration, formatTime } from "@/utils";
import store from "@/store";
import { getSongDetail, getSongInList } from "@/apis/song";
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
interface DataI {
  name: string;
  artist: string;
  url: string;
  cover: string;
}

const PlaylistDetail = () => {
  const [playlistDetail, setPlaylistDetail] = useState({
    coverImgUrl: "",
    name: "",
    id: "",
    createTime: "",
    description: "",
    playCount: 0,
    subscribedCount: 0,
    commentCount: 0,
    shareCount: 0,
    trackCount: 0,
    tracks: [],
    tags: [],
    creator: {
      nickname: "",
      userId: "",
      avatarUrl: "",
      avatarDetail: { identityIconUrl: "" },
    },
  });
  const [playlistComment, setPlaylistComment] = useState({
    total: 0,
    comments: [],
    hotComments: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [fold, setFold] = useState(true);
  const [descHeight, setDescHeight] = useState(0);
  const playlistID = useLocation().search.slice(4);

  useEffect(() => {
    setDescHeight(document.querySelector(".desc-content")!.clientHeight);
  }, [playlistDetail]);

  useEffect(() => {
    async function getData() {
      const { playlist } = await getPlaylistDetail({
        id: playlistID,
      });

      setPlaylistDetail(playlist);
    }
    getData();
  }, [playlistID]);

  useEffect(() => {
    async function getData() {
      const comments = await getPlaylistComment({
        id: playlistID,
      });

      setPlaylistComment(comments);
    }
    getData();
  }, [playlistID]);

  const onPageChange = (current: number) => {
    setPlaylistComment({
      total: playlistComment.total,
      comments: [],
      hotComments: [],
    });
    getPlaylistComment({
      id: playlistID,
      offset: current !== 1 ? current : undefined,
    }).then((res) => {
      setPlaylistComment(res);
      setCurrentPage(current);
    });
  };

  const resetPlaylist = async (id: string) => {
    const data: DataI[] = [];

    const { songs } = await getSongInList({
      id: id,
    });

    songs.map(
      (item: {
        name: string;
        id: string;
        al: { picUrl: string };
        ar: { name: string }[];
      }) =>
        data.push({
          name: item.name,
          artist: item.ar[0].name,
          url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
          cover: item.al.picUrl,
        })
    );

    store.resetPlaylist(data);
  };

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
    <>
      <div className="playlist-detail">
        <div className="top">
          <div className="left">
            <div className="playlist-cover">
              <img src={playlistDetail.coverImgUrl} alt="封面" />
            </div>
          </div>
          <div className="right">
            <div className="playlist-name">{playlistDetail.name}</div>
            <div className="playlist-creator">
              <Link
                to={`/user/home?id=${playlistDetail.creator.userId}`}
                className="creator-photo"
              >
                <img src={playlistDetail.creator.avatarUrl} alt="头像" />
              </Link>
              <Link
                to={`/user/home?id=${playlistDetail.creator.userId}`}
                className="creator-name"
              >
                {playlistDetail.creator.nickname}
              </Link>
              {playlistDetail.creator.avatarDetail ? (
                <img
                  src={playlistDetail.creator.avatarDetail.identityIconUrl}
                  alt=""
                />
              ) : (
                ""
              )}
              <div className="playlist-create-time">
                {formatTime(playlistDetail.createTime, 1) + " 创建"}
              </div>
            </div>
            <div className="buttons">
              <div
                className="play-button"
                onClick={action(() => resetPlaylist(playlistDetail.id))}
              >
                播放
              </div>
              <div className="add-to-list-button"></div>
              <div className="store-button">
                （{playlistDetail.subscribedCount}）
              </div>
              <div className="share-button">
                （{playlistDetail.shareCount}）
              </div>
              <div className="download-button">下载</div>
              <div className="comment-button">
                （{playlistDetail.commentCount}）
              </div>
            </div>
            <div className="tags">
              标签：
              {playlistDetail.tags.map((item: string, index: number) => (
                <div key={index} className="tag">
                  {item}
                </div>
              ))}
            </div>
            <div
              className="playlist-desc"
              style={{ maxHeight: fold ? "" : "none" }}
            >
              <div className="desc-content">
                介绍： {playlistDetail.description}
              </div>
            </div>
            <div
              className="fold-button"
              style={{
                display: descHeight > 90 ? "" : "none",
              }}
              onClick={() => setFold(!fold)}
            >
              {fold ? "展开" : "收起"}
              <span
                style={{ backgroundPosition: fold ? "" : "-45px -520px" }}
              ></span>
            </div>
          </div>
        </div>
        <div className="playlist-songs">
          <div className="title-bar">
            <div className="title">
              歌曲列表 <span>{playlistDetail.trackCount}首歌</span>
            </div>
            <div className="right">
              <Link
                className="out-link"
                to={`/outchain/2/${playlistDetail.id}`}
              >
                生成外链播放器
              </Link>
              <div className="play-count">
                播放：<span>{playlistDetail.playCount}</span>次
              </div>
            </div>
          </div>
          <table className="song-list">
            <thead>
              <tr>
                <th className="th1"></th>
                <th className="th2">歌曲列表</th>
                <th className="th3">时长</th>
                <th className="th4">歌手</th>
                <th className="th5">专辑</th>
              </tr>
            </thead>
            <tbody>
              {playlistDetail.tracks.map(
                (
                  item: {
                    name: string;
                    id: string;
                    ar: [];
                    al: { name: string; id: string };
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
                      {item.ar.map(
                        (
                          artist: { id: string; name: string; tns: [] },
                          arIndex: number
                        ) => (
                          <Link
                            to={`/artist?id=${artist.id}`}
                            className="link-to-artist"
                            key={arIndex}
                          >
                            {artist.name}
                          </Link>
                        )
                      )}
                    </td>
                    <td className="td5">
                      <Link
                        to={`/album?id=${item.al.id}`}
                        className="link-to-album"
                      >
                        {item.al.name}
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="download-tips">
          <div className="tips">查看更多内容，请下载客户端</div>
          <Link to="/download" className="download-button">
            立即下载
          </Link>
        </div>
      </div>
      <div className="playlist-comments">
        <MakeComments />

        {playlistComment.hotComments ? (
          <>
            <div className="playlist-comment-title">精彩评论</div>
            {playlistComment.hotComments.map((item: CommentInterface) => (
              <Comments key={item.commentId} commentInfo={item} />
            ))}
          </>
        ) : (
          ""
        )}
        <div
          className="playlist-comment-title"
          style={{ display: playlistComment.hotComments ? "" : "none" }}
        >
          最新评论(
          {playlistComment.total})
        </div>
        {playlistComment.comments.map((item: CommentInterface) => (
          <Comments key={item.commentId} commentInfo={item} />
        ))}
        <div className="playlist-pagination">
          <Pagination
            pageSize={20}
            current={currentPage}
            total={playlistComment.total}
            onPageChange={(current: number) => {
              onPageChange(current);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PlaylistDetail;
