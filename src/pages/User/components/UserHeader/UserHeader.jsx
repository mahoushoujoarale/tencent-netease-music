import React, { useEffect, useState } from "react";
import './UserHeader.less'
import { getUserDetail } from "@/apis/user";
import { useLocation } from 'react-router-dom'
import { Button } from "antd";


const UserHeader = () => {
    let location = useLocation();
    const uid = location.search.slice(4)
    const [change, setChange] = useState(false)
    const [userDetail, setUserDetail] = useState({
        profile: {
            avatar: '',
            nickname: '',
            follows:'',
            followeds:''
        }
    })

    const styles = {
        fontSize: "12px",
        color: "#666"
    }

    useEffect(() => {
        getUserDetail({ id: uid }).then((res) => {
            setUserDetail(res)
           // console.log("userDetail:", userDetail)
        })
        setChange(!change)
    }, [])

    return <div className="userTop">
        <div className="avatar">
            <img src={userDetail.profile.avatarUrl} className="avatarImg"></img>
        </div>
        <div className="detail">
            <div className="userName">
                <p style={{ fontSize: "22px", color: "#333" }}>{userDetail.profile.nickname}</p>
                <div className="gender"></div>
                <Button style={{marginLeft:"410px"}}>编辑个人信息</Button>
            </div>
            <div className="top1">
                <div className="tl1">
                    <p style={{ fontSize: "24px", lineHeight: "20px" }}>0</p>
                    <p style={{ color: "#666", fontSize: "12px", lineHeight: '10px', marginTop: "-10px" }}>动态</p>
                </div>
                <div className="tm1">
                    <p style={{ fontSize: "24px", lineHeight: "20px" }}>{userDetail.profile.follows}</p>
                    <p style={{ color: "#666", fontSize: "12px", lineHeight: '10px', marginTop: "-10px" }}>关注</p>
                </div>
                <div className="tr1">
                    <p style={{ fontSize: "24px", lineHeight: "20px" }}>{userDetail.profile.followeds}</p>
                    <p style={{ color: "#666", fontSize: "12px", lineHeight: '10px', marginTop: "-10px" }}>粉丝</p>
                </div>
            </div>
            <div className="top2">
                <p style={styles}>所在地区：云南省-昆明市</p>
            </div>
            <div className="top3">
                <p style={styles}>社交网络：微博</p>
            </div>
        </div>
    </div>
};

export default UserHeader;
