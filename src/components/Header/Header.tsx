import "./index.less";
import { list, subNav } from "./data";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Login from "../Login/Login";

const Header = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const [loginPaneVisible, setLoginPaneVisible] = useState(false);

  return (
    <>
      <Login
        visible={loginPaneVisible}
        handleCancel={() => {
          setLoginPaneVisible(false);
        }}
      />
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
            <div
              className="login"
              onClick={() => {
                setLoginPaneVisible(true);
              }}
            >
              登录
            </div>
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
