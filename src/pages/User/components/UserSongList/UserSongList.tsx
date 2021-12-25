import React, {useEffect, useState} from "react";
import './UserSongList.less'
import { getUserDetail } from "@/apis/user";
import { useNavigate, useLocation,Link } from "react-router-dom";
import { getUserPlayList } from "@/apis/getUserPlayList";
import { formatPlayCount, resetPlaylist} from "@/utils";
import { action } from "mobx";

const UserSongList:React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [userDetail,setUserDetail] = useState({
        playlistCount:0
    })
    const [userPlayList, setUserPlayList] = useState([])
    const uid = location.search.slice(4)
    useEffect (()=> {
        getUserDetail({id : uid}).then((res) => {
            setUserDetail(res.profile)
            console.log("userDtail:",res)
        })
    },[])

    useEffect (()=> {
        getUserPlayList({id : uid}).then((res) => {
            if (res.code === 200) {
                setUserPlayList(res.playlist)
            }
            
            console.log("getUserPlayList:",res)
        })
    },[])

  return (<div>
      <div className="songListHeader">
          <p style={{fontSize: "22px", color: "#333"}}>我创建的歌单（{userDetail.playlistCount}）</p>
      </div>
      <div className="songListContent">
      { userPlayList.map(
          (item: {
            id: string;
            coverImgUrl: string;
            playCount: number;
            name: string;
          }) => {
            return (
              <div key={item.id}>
                <div className="songListitem">
                  <Link to={`/playlist?id=${item.id}`}>
                    <div
                      className="content"
                      style={{ backgroundImage: `url(${item.coverImgUrl})` }}
                    >
                      <div
                        className="bottom"
                        onClick={(event) => event.preventDefault()}
                      >
                        <div className="count">
                          {formatPlayCount(item.playCount)}
                        </div>
                        <div
                          className="play"
                          onClick={action((event) => {
                            event.preventDefault();
                            resetPlaylist(item.id);
                          })}
                        >
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/playlist?id=${item.id}`}>
                    <div className="name">{item.name}</div>
                  </Link>
                </div>
              </div>
            );
          }
        )}
      </div>
  </div>
  )
};

export default UserSongList;
