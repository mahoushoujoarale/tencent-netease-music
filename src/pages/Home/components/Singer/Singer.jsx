import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.less";
import { getSinger } from "@/apis/home";

const Singer = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getData() {
      const { artists: data = [] } = await getSinger();
      setList(data.slice(0, 5));
    }
    getData();
  }, []);

  return (
    <div className="singer">
      <div className="container">
        <div className="singer-top">
          <div className="title">入驻歌手</div>
          <Link to="/discover/artist/signed/" className="all">
            查看全部&gt;
          </Link>
        </div>
        <div className="items">
          {list.map((item) => {
            return (
              <Link
                to={`user/home?id=${item.id}`}
                className="item"
                key={item.id}
              >
                <div
                  className="left"
                  style={{ backgroundImage: `url(${item.picUrl})` }}
                ></div>
                <div className="right">
                  <div className="singer-name">{item.name}</div>
                  <div className="desc">{item.alias[0] || ""}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <Link to="/st/musician" className="button">
          申请成为网易音乐人
        </Link>
      </div>
    </div>
  );
};

export default Singer;
