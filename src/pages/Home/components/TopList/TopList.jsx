import React, { useEffect, useState } from "react";
import "./index.less";
import BlockTitle from "../BlockTitle/BlockTitle";
import { getToplist, getToplistById } from "@/apis/home";
import { Link } from "react-router-dom";

const TopList = () => {
  const [rank, setRank] = useState([]);

  useEffect(() => {
    async function getData() {
      const { list = [] } = await getToplist();
      const middle = [];
      const data = [];
      for (let i = 0; i < 3; i++) {
        middle[i] = await getToplistById({ id: list[i].id });
        data[i] = middle[i].playlist || {};
      }
      setRank(data);
    }
    getData();
  }, []);
  return (
    <div className="toplist">
      <BlockTitle name="榜单" href="/discover/toplist" />
      <div className="container">
        {rank.map((playlist) => {
          return (
            <div className="column" key={playlist.id}>
              <div className="top-box">
                <Link
                  to={`/discover/toplist?id=${playlist.id}`}
                  className="left"
                  style={{ backgroundImage: `url(${playlist.coverImgUrl})` }}
                ></Link>
                <div className="right">
                  <Link
                    to={`/discover/toplist?id=${playlist.id}`}
                    className="listname"
                  >
                    {playlist.name}
                  </Link>
                  <div className="icon play"></div>
                  <div className="icon collect"></div>
                </div>
              </div>
              <div className="bottom">
                {playlist.tracks.slice(0, 10).map((item, index) => {
                  return (
                    <div className="item" key={item.id}>
                      <span className="number">{index + 1}</span>
                      <Link to={`/song?id=${item.id}`} className="name">
                        {item.name}
                      </Link>
                      <div className="icons">
                        <div className="icon play"></div>
                        <div className="icon add"></div>
                        <div className="icon collect"></div>
                      </div>
                    </div>
                  );
                })}
                <Link
                  to={`/discover/toplist?id=${playlist.id}`}
                  className="all"
                >
                  查看全部&gt;
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopList;
