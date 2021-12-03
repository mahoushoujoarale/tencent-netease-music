import React, { useEffect } from "react";
import HomeAlbum from "./components/HomeAlbum/HomeAlbum";
import HomeAnchor from "./components/HomeAnchor/HomeAnchor";
import HomeFocus from "./components/HomeFocus/HomeFocus";
import HomeLoginBox from "./components/HomeLoginBox/HomeLoginBox";
import HomeRecommend from "./components/HomeRecommend/HomeRecommend";
import HomeSinger from "./components/HomeSinger/HomeSinger";
import HomeTopList from "./components/HomeTopList/HomeTopList";
import "./index.less";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <HomeFocus />
      <div className="edit-center">
        <div className="left">
          <HomeRecommend />
          <HomeAlbum />
          <HomeTopList />
        </div>
        <div className="right">
          <HomeLoginBox />
          <HomeSinger />
          <HomeAnchor />
        </div>
      </div>
    </div>
  );
};

export default Home;
