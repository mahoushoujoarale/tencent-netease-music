import React, { useEffect, useState } from "react";
import Login from "@/components/Login/Login";
import "./index.less";
import { getUserAccount, getUserDetail } from "@/apis/user";
import { Link } from "react-router-dom";

const HomeLoginBox = () => {
  const [loginPaneVisible, setLoginPaneVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: 0,
    nickname: "",
    avatarUrl: "",
  });
  const [userDetail, setUserDetail] = useState({
    level: 0,
    profile: {
      eventCount: 0,
      followeds: 0,
      follows: 0,
    },
  });

  useEffect(() => {
    async function getData() {
      const { profile } = await getUserAccount();

      if (profile) {
        const data = await getUserDetail({ id: profile.userId });

        setUserDetail(data);
      }
      setUserInfo(profile);
    }
    getData();
  }, []);

  return (
    <>
      {loginPaneVisible ? (
        <Login
          handleCancel={() => {
            setLoginPaneVisible(false);
          }}
        />
      ) : (
        ""
      )}
      {userInfo ? (
        <div className="home-login-user-pane">
          <div className="top">
            <Link
              to={`/user/event?id=${userInfo.userId}`}
              className="user-photo"
            >
              <img src={userInfo.avatarUrl} alt="avatar" />
            </Link>
            <div className="right">
              <Link
                to={`/user/event?id=${userInfo.userId}`}
                className="user-name"
              >
                {userInfo.nickname}
              </Link>
              <Link to={`/user/level`} className="user-level">
                {userDetail.level}
              </Link>
              <div className="sign-button">签 到</div>
            </div>
          </div>
          <div className="bottom">
            <Link to={`/user/event?id=${userInfo.userId}`} className="item">
              <span>{userDetail.profile.eventCount}</span>动态
            </Link>
            <Link to={`/user/follows?id=${userInfo.userId}`} className="item">
              <span>{userDetail.profile.follows}</span>关注
            </Link>
            <Link to={`/user/fans?id=${userInfo.userId}`} className="item">
              <span>{userDetail.profile.followeds}</span>粉丝
            </Link>
          </div>
        </div>
      ) : (
        <div className="home-login-box">
          <div className="tips">
            登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
          </div>
          <div
            className="login-button"
            onClick={() => setLoginPaneVisible(true)}
          >
            用户登录
          </div>
        </div>
      )}
    </>
  );
};

export default HomeLoginBox;
