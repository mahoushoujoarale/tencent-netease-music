import "./RadioplayContent.less";
import { getDJdetail, getDJProgram } from "@/apis/getDJdetail";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  addToPlaylist,
  resetPlaylist,
} from "@/utils";
import { action } from "mobx";


const RadioplayContent = () => {
  const [playlistDetail, setPlaylistDetail] = useState({
    category:"",
    picUrl: "",
    name: "",
    id: "",
    createTime: "",
    desc: "",
    playCount: 0,
    commentCount:0,
    subCount: 0,
    shareCount: 0,
    programCount: 0,
    tracks: [],
    tags: [],
    dj: {
      nickname: "",
      userId: "",
      avatarUrl: "",
      avatarDetail: { identityIconUrl: "" },
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [fold, setFold] = useState(true);
  const [descHeight, setDescHeight] = useState(0);
  const [relativeRaio,setRelativeRaio] = useState([])
  const playlistID = useLocation().search.slice(4);

  useEffect(() => {
    setDescHeight(document.querySelector(".desc-content")!.clientHeight);
  }, [playlistDetail]);

  useEffect(() => {
    async function getData() {
      getDJdetail({
        id: playlistID,
      }).then ((res) => {
        //console.log("getDJdetail",res)
        if (res.code === 200) {
           setPlaylistDetail(res.data);
        }
        //console.log("getDJdetailafter",playlistDetail)
      })
      
    }
    //console.log("getDJdetailID",playlistID)
    getData();
  }, []);

  useEffect(()=> {
    getDJProgram({id:playlistID}, {limit: '40'}).then ((res)=> {
      if (res.code === 200) {
        setRelativeRaio(res.programs)
      }
      //console.log("getDJProgram",res)
    })
  },[])

  return (
    <>
      <div className="playlist-detail">
        <div className="top">
          <div className="left">
            <div className="playlist-cover">
              <img src={playlistDetail.picUrl} alt="封面" />
            </div>
          </div>
          <div className="right">
            <div className="playlist-name">{playlistDetail.name}</div>
            <div className="playlist-creator">
              <Link
                to={`/user/home?id=${playlistDetail.dj.userId}`}
                className="creator-photo"
              >
                <img src={playlistDetail.dj.avatarUrl} alt="头像" />
              </Link>
              <Link
                to={`/user/home?id=${playlistDetail.dj.userId}`}
                className="creator-name"
              >
                {playlistDetail.dj.nickname}
              </Link>
              {playlistDetail.dj.avatarDetail ? (
                <img
                  src={playlistDetail.dj.avatarDetail.identityIconUrl}
                  alt=""
                />
              ) : (
                ""
              )}
            </div>
            <div className="buttons">
              <div
                className="play-button"
                onClick={action(() => resetPlaylist(playlistDetail.id))}
              >
                订阅
              </div>
              <div className="add-to-list-button"></div>
              <div className="download-button">下载</div>
              <div className="comment-button">
                （{playlistDetail.commentCount}）
              </div>
            </div>
            <div className="tags">
              <div className="plCategory">{playlistDetail.category}</div>
            </div>
            <div
              className="playlist-desc"
              style={{ maxHeight: fold ? "" : "none" }}
            >
              <div className="desc-content">
                介绍： {playlistDetail.desc}
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
              节目列表 <span>共{playlistDetail.programCount}期</span>
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
            <tbody>
              {(relativeRaio || []).map(
                (
                  item: {
                    name: string;
                    id: string;
                    likedCount: string,
                    listenerCount: number,
                    ar: [];
                    al: { name: string; id: string };
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
                      <Link to={`*`} className="link-to-song">
                        {item.name}
                      </Link>
                    </td>
                    <td className="td3">
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
                      <div>赞{item.likedCount}</div>
                    </td>
                    <td className="td5">
                      <div>
                        播放{Math.floor(item.listenerCount/10000)}
                      </div>
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
    </>
  );
};

export default RadioplayContent;
