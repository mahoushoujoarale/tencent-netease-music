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

  const [fold, setFold] = useState(true);
  const [descHeight, setDescHeight] = useState(0);
  const [relativeRaio,setRelativeRaio] = useState([])
  const playlistID = useLocation().search.slice(4);


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
      <div className="Rplaylist-detail">
        <div className="Rtop">
          <div className="Rleft">
            <div className="Rplaylist-cover">
              <img className="Rimg" src={playlistDetail.picUrl} alt="封面" />
            </div>
          </div>
          <div className="Rright">
            <div className="Rplaylist-name">{playlistDetail.name}</div>
            <div className="Rplaylist-creator">
              <Link
                to={`/user/home?id=${playlistDetail.dj.userId}`}
                className="Rcreator-photo"
              >
                <img className="Ravatar" src={playlistDetail.dj.avatarUrl} alt="头像" />
              </Link>
              <Link
                to={`/user/home?id=${playlistDetail.dj.userId}`}
                className="Rcreator-name"
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
            <div className="Rbuttons">
              <div
                className="Rplay-button"
                onClick={action(() => resetPlaylist(playlistDetail.id))}
              >
                订阅
              </div>
              <div className="Radd-to-list-button"></div>
              <div className="Rdownload-button">下载</div>
              <div className="Rcomment-button">
                （{playlistDetail.commentCount}）
              </div>
            </div>
            <div className="Rtags">
              <div className="RplCategory">{playlistDetail.category}</div>
            </div>
            <div
              className="Rplaylist-desc"
              style={{ maxHeight: fold ? "" : "none" }}
            >
              <div className="Rdesc-content">
                介绍： {playlistDetail.desc}
              </div>
            </div>
            <div
              className="Rfold-button"
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
        <div className="Rplaylist-songs">
          <div className="Rtitle-bar">
            <div className="Rtitle">
              节目列表 <span>共{playlistDetail.programCount}期</span>
            </div>
            <div className="Rright">
              <Link
                className="Rout-link"
                to={`/outchain/2/${playlistDetail.id}`}
              >
                生成外链播放器
              </Link>
              <div className="Rplay-count">
                播放：<span>{playlistDetail.playCount}</span>次
              </div>
            </div>
          </div>
          <table className="Rsong-list">
            <tbody className="Rtbody">
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
                  <tr className="Rtr" key={index}>
                    <td className="Rtd1">
                      <div className="Rno">{index + 1}</div>
                      <span
                        className="RadioContentPlay"
                        onClick={action(() => addToPlaylist(item.id))}
                      ></span>
                    </td>
                    <td className="Rtd2">
                      <Link to={`*`} className="Rlink-to-song">
                        {item.name}
                      </Link>
                    </td>
                    <td className="Rtd3">
                      <div className="Roptions">
                        <div
                          className="Radd-button"
                          title="添加到播放列表"
                        ></div>
                        <div className="Rshare-button" title="分享"></div>
                        <div className="Rdownload-button" title="下载"></div>
                      </div>
                    </td>
                    <td className="Rtd4">
                      <div>赞{item.likedCount}</div>
                    </td>
                    <td className="Rtd5">
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
