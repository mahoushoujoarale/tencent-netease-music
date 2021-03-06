import "./index.less";
import { getSongDetail, getSongComment, getLyric } from "@/apis/song";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import MakeComments from "@/components/MakeComments/MakeComments";
import Comments from "@/components/Comments/Comments";
import Pagination from "@/components/Pagination/Pagination";
import { action } from "mobx";
import { addToPlaylist } from "@/utils";

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

const SongDetail = () => {
  const [songDetail, setSongDetail] = useState({
    al: { picUrl: "", name: "", id: "" },
    name: "",
    ar: [],
  });
  const [songComment, setSongComment] = useState({
    total: 0,
    comments: [],
    hotComments: [],
  });
  const [lyric, setLyric] = useState([]);
  const [fold, setFold] = useState(true);
  const [descHeight, setDescHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const songID = useLocation().search.slice(4);

  useEffect(() => {
    setDescHeight(document.querySelector(".lyric-content")!.clientHeight);
  }, [songDetail]);

  useEffect(() => {
    async function getData() {
      const { songs } = await getSongDetail({
        ids: songID,
      });

      setSongDetail(songs[0]);
    }
    getData();
  }, [songID]);

  useEffect(() => {
    async function getData() {
      const comments = await getSongComment({
        id: songID,
      });

      setSongComment(comments);
    }
    getData();
  }, [songID]);

  useEffect(() => {
    async function getData() {
      let {
        lrc: { lyric },
      } = await getLyric({
        id: songID,
      });
      lyric = lyric.split(/\[.*\]/g);

      setLyric(lyric);
    }
    getData();
  }, [songID]);

  const onPageChange = (current: number) => {
    setSongComment({
      total: songComment.total,
      comments: [],
      hotComments: [],
    });
    getSongComment({
      id: songID,
      offset: current !== 1 ? current : undefined,
    }).then((res) => {
      setSongComment(res);
      setCurrentPage(current);
    });
  };

  return (
    <>
      <div className="song-detail">
        <div className="left">
          <div className="song-cover">
            <img src={songDetail.al.picUrl} alt="??????" />
          </div>
          <Link className="out-link" to={`/outchain/2/${songDetail.al.id}`}>
            ?????????????????????
          </Link>
        </div>
        <div className="right">
          <div className="song-name">{songDetail.name}</div>
          <div className="song-singer">
            ?????????
            {(songDetail.ar || []).map((item: { name: string; id: string }) => {
              return (
                <Link to={`/artist?id=${item.id}`} key={item.id}>
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="song-album">
            ???????????????
            <Link to={`/album?id=${songDetail.al.id}`}>
              {songDetail.al.name}
            </Link>
          </div>
          <div className="buttons">
            <div
              className="play-button"
              onClick={action(() => addToPlaylist(songID))}
            >
              ??????
            </div>
            <div className="add-to-list-button"></div>
            <div className="store-button">??????</div>
            <div className="share-button">??????</div>
            <div className="download-button">??????</div>
            <div className="comment-button">???{songComment.total}???</div>
          </div>
          <div className="lyric" style={{ maxHeight: fold ? "" : "none" }}>
            <div className="lyric-content">
              {(lyric || []).map((item: string, index: number) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
          <div
            className="fold-button"
            onClick={() => setFold(!fold)}
            style={{
              display: descHeight > 327 ? "" : "none",
            }}
          >
            {fold ? "??????" : "??????"}
            <span
              style={{ backgroundPosition: fold ? "" : "-45px -520px" }}
            ></span>
          </div>
          <Link to="/lyric/report?id=1872024726" className="report-errors">
            ??????
          </Link>
        </div>
      </div>
      <div className="song-comments">
        <MakeComments />

        {songComment.hotComments ? (
          <>
            <div className="song-comment-title">????????????</div>
            {(songComment.hotComments || []).map((item: CommentInterface) => (
              <Comments key={item.commentId} commentInfo={item} />
            ))}
          </>
        ) : (
          ""
        )}
        <div
          className="song-comment-title"
          style={{ display: songComment.hotComments ? "" : "none" }}
        >
          ????????????(
          {songComment.total})
        </div>
        {(songComment.comments || []).map((item: CommentInterface) => (
          <Comments key={item.commentId} commentInfo={item} />
        ))}
        <div className="song-pagination">
          <Pagination
            pageSize={20}
            current={currentPage}
            total={songComment.total}
            onPageChange={(current: number) => {
              onPageChange(current);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SongDetail;
