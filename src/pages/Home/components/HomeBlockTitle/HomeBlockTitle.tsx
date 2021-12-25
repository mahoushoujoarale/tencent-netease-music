import React from "react";
import { Link } from "react-router-dom";
import "./index.less";

const HomeBlockTitle = (props: {
  name: string;
  list?: { name: string; href: string }[];
  href: string;
}) => {
  const { name, list, href } = props;
  return (
    <div className="home-block-title">
      <div className="name">{name}</div>
      {list ? (
        <ul className="list">
          {(list || []).map((item: { name: string; href: string }) => {
            return (
              <li key={item.name}>
                <Link to={item.href} className="item">
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
      <Link to={href} className="more">
        更多
      </Link>
    </div>
  );
};

export default HomeBlockTitle;
