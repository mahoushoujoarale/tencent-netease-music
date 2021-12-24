import "./index.less";
import { list, subNav } from "./data";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { getUserAccount } from "@/apis/user";
import Login from "../Login/Login";
import { logOut } from "@/apis/login";

const onLogOutClick = async () => {
  console.log("logout");
  await logOut().then((res) => {
    console.log(res);
    document.cookie = "";
  });

  window.location.reload();
};

const Header = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const [loginPaneVisible, setLoginPaneVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: 0,
    nickname: "",
    avatarUrl: "",
  });
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    async function getData() {
      const { profile } = await getUserAccount();

      if (profile) {
        setLoginState(true);
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
      <div className="header">
        <div className="header-nav">
          <div className="container">
            <h1 className="logo">
              <a href="/#">网易云音乐</a>
            </h1>
            <ul className="list">
              {list.map(
                (
                  item: { title: string; path: string; isHot: boolean },
                  index: number
                ) => {
                  return (
                    <li
                      key={item.title}
                      onClick={() => {
                        setCurrentItem(index);
                      }}
                      style={{ display: "inline-block" }}
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive ? "current-item" : "item"
                        }
                      >
                        {item.title}
                        {item.isHot ? <span className="isHot"></span> : ""}
                      </NavLink>
                    </li>
                  );
                }
              )}
            </ul>
            <div className="search">
              <input type="text" placeholder="音乐/视频/电台/用户" />
            </div>
            <Link to="/creatorcenter" className="creator">
              创作者中心
            </Link>
            {loginState ? (
              <div className="header-user-photo">
                <img src={userInfo.avatarUrl} alt="avatar" />
                <div className="user-pane">
                  <Link
                    to={`/user/home?id=${userInfo.userId}`}
                    className="item"
                  >
                    <span style={{ backgroundPosition: "0 -80px" }}></span>
                    我的主页
                  </Link>
                  <Link to="/msg/m/private" className="item">
                    <span style={{ backgroundPosition: "-20px -120px" }}></span>
                    我的消息
                  </Link>
                  <Link to="/user/level" className="item">
                    <span style={{ backgroundPosition: "0 -100px" }}></span>
                    我的等级
                  </Link>
                  <Link to="/member" className="item">
                    <span style={{ backgroundPosition: "0 -221px" }}></span>
                    VIP会员
                  </Link>
                  <Link to="/user/update" className="item">
                    <span style={{ backgroundPosition: "0 -140px" }}></span>
                    个人设置
                  </Link>
                  <div className="item">
                    <span style={{ backgroundPosition: "-20px -142px" }}></span>
                    实名认证
                  </div>
                  <div className="item" onClick={onLogOutClick}>
                    <span style={{ backgroundPosition: "0 -200px" }}></span>退出
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="header-login"
                onClick={() => {
                  setLoginPaneVisible(true);
                }}
              >
                登录
              </div>
            )}
          </div>
        </div>
        <div className="sub-nav">
          <div className="top"></div>
          <div
            className="bottom"
            style={{ display: !currentItem ? "" : "none" }}
          >
            <ul className="sub-list">
              {subNav.map(
                (
                  item: { name: string; path: string; isHot: boolean },
                  index: number
                ) => {
                  return (
                    <li key={item.name} style={{ display: "inline-block" }}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive ? "current-sub-item" : "sub-item"
                        }
                      >
                        {item.name}
                        {item.isHot ? <span className="isHot"></span> : ""}
                      </NavLink>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
