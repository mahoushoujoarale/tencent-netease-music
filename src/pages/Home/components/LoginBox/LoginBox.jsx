import React, { useState } from "react";
import Login from "@/components/Login/Login";
import "./index.less";

const LoginBox = () => {
  const [loginPaneVisible, setLoginPaneVisible] = useState(false);

  return (
    <>
      <Login
        visible={loginPaneVisible}
        handleCancel={() => {
          setLoginPaneVisible(false);
        }}
      />
      <div className="login-box">
        <div className="tips">
          登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
        </div>
        <div className="login-button" onClick={() => setLoginPaneVisible(true)}>
          用户登录
        </div>
      </div>
    </>
  );
};

export default LoginBox;
