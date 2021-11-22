import React from "react";
import { getRecommend } from "@/apis/home";
import { useState, useEffect } from "react";
import BlockTitle from "../BlockTitle/BlockTitle";
import { Link } from "react-router-dom";
import "./index.less";
import { formatPlayCount } from "@/utils/formatPlayCount";

const Recommend = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getData() {
      const { result: data = [] } = await getRecommend();
      setList(data.slice(0, 8));
    }
    getData();
  }, []);

  return (
    <div className="recommend">
      <BlockTitle
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
        {list.map((item) => {
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
                      <div className="play"></div>
                    </div>
                  </div>
                </Link>
                <Link to={`/playlist?id=${item.id}`}>
                  <div className="name">{item.name}</div>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Recommend;
