import React from "react";
import { Link } from "react-router-dom";
import "./index.less";

const BlockTitle = (props) => {
  const { name = "", list = [], href = "" } = props;
  return (
    <div className="block-title">
      <div className="name">{name}</div>
      <ul className="list">
        {list.map((item) => {
          return (
            <li key={item.name}>
              <Link to={item.href} className="item">
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to={href} className="more">
        更多
      </Link>
    </div>
  );
};

export default BlockTitle;
