import React from "react";
import { getRecommend } from "@/apis/home";
import { useState, useEffect } from "react";
import HomeBlockTitle from "../HomeBlockTitle/HomeBlockTitle";
import { Link } from "react-router-dom";
import "./index.less";
import { formatPlayCount, resetPlaylist } from "@/utils";
import { action } from "mobx";

const HomeRecommend = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getData() {
      const { result } = await getRecommend();
      setList(result.slice(0, 8));
    }
    getData();
  }, []);

  return (
    <div className="home-recommend">
      <HomeBlockTitle
        name="热门推荐"
        list={[
          { name: "华语", href: "/discover/playlist/?cat=华语" },
          { name: "流行", href: "/discover/playlist/?cat=流行" },
          { name: "摇滚", href: "/discover/playlist/?cat=摇滚" },
          { name: "民谣", href: "/discover/playlist/?cat=民谣" },
          { name: "电子", href: "/discover/playlist/?cat=电子" },
        ]}
        href="/discover/playlist"
      />
      <ul className="list">
        {(list || []).map(
          (item: {
            id: string;
            picUrl: string;
            playCount: number;
            name: string;
          }) => {
            return (
              <li key={item.id}>
                <div className="item">
                  <Link to={`/playlist?id=${item.id}`}>
                    <div
                      className="content"
                      style={{ backgroundImage: `url(${item.picUrl})` }}
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
                        ></div>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/playlist?id=${item.id}`}>
                    <div className="name">{item.name}</div>
                  </Link>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default HomeRecommend;
