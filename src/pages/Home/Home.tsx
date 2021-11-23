import React from "react";
import Album from "./components/Album/Album";
import Anchor from "./components/Anchor/Anchor";
import Focus from "./components/Focus/Focus";
import LoginBox from "./components/LoginBox/LoginBox";
import Recommend from "./components/Recommend/Recommend";
import Singer from "./components/Singer/Singer";
import TopList from "./components/TopList/TopList";
import "./index.less";

const Home = () => {
  return (
    <div className="home">
      <Focus />
      <div className="edit-center">
        <div className="left">
          <Recommend />
          <Album />
          <TopList />
        </div>
        <div className="right">
          <LoginBox />
          <Singer />
          <Anchor />
        </div>
      </div>
    </div>
  );
};

export default Home;
