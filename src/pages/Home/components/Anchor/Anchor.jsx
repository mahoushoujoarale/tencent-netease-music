import React, { useEffect, useState } from "react";
import { getAnchor } from "@/apis/home";
import "./index.less";
import { Link } from "react-router-dom";

const Anchor = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data = [] } = await getAnchor();
      setList(data.list.slice(0, 5));
    }
    getData();
  }, []);
  return (
    <div className="anchor">
      <div className="container">
        <div className="top">热门主播</div>
        <div className="items">
          {list.map((item) => {
            return (
              <div className="item" key={item.id}>
                <Link
                  to={`/user/home?id=${item.id}`}
                  style={{ backgroundImage: `url(${item.avatarUrl})` }}
                  className="left"
                ></Link>
                <div className="right">
                  <Link to={`/user/home?id=${item.id}`} className="name">
                    {item.nickName}
                  </Link>
                  <div className="desc">垃圾接口,啥也没有</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Anchor;
