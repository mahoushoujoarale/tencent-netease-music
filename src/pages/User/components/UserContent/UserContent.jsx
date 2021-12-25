import React, { useState, useEffect } from "react";
import './UserContent.less'
import { useLocation } from "react-router-dom";
import { getUserDetail} from "@/apis/user";
import { PlayCircleOutlined } from "@ant-design/icons";
import { getPersonalizedList } from "@/apis/personalizedList";
import { useNavigate,Link } from "react-router-dom";
const UserContent = () => {
    const fontStyle = {
        fontSize: "22px",
        color: "#666"
    }
    const [personalizedList, setPersonalizedList] = useState([])
    const navigate = useNavigate()
    let location = useLocation();
    const uid = location.search.slice(4)
    const [userDetail, setUserDetail] = useState({
        profile: {
            listenSongs: 0
        }
    })
    useEffect(() => {
        getUserDetail({ id: uid }).then((res) => {
            setUserDetail(res)
            //console.log("userDetail:", res)
        })
    }, [])

    useEffect(() => {
        getPersonalizedList().then((res) => {
            setPersonalizedList(res.data.dailySongs)
            //console.log("getPersonalizedList:", res)
        })
    }, [])

    let i = 0;
    const contStyle = {
        color: "#666",
        marginRight: "10px"
    }


    return <div>
        <div className="contentTitle">
            <p style={fontStyle}>听歌排行</p>
            <p className="textStyle">累计听歌{userDetail.listenSongs}首</p>
        </div>
        <div className="contentList">
            {
                personalizedList.map((item) => {
                    return <div className="userSongItem">
                        <p className="s_count">{++i}. </p>
                        <PlayCircleOutlined className="palyBtn" />
                        <div className="songName">
                            <Link to ={`/playlist?id=${item.id}`}>
                            <p style={{ fontWeight: "bold", color: "#333" }} 
                               >{item.name}</p>
                            </Link>
                            <p style={{ color: "#999" }}>&emsp;-{item.ar[0].name}</p>
                        </div>
                        <div className="listenCount" style={{ width:`${ item.id%10 < 3 ?30: item.id%10* 10 }%`}}>
                            <p style={contStyle}>{ item.id%100}次</p>
                        </div>
                    </div>
                })
            }
        </div>
    </div>;
};

export default UserContent;
