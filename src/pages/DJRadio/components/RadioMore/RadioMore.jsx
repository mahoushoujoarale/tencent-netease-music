import React from "react";
import styles from './RadioMore.less'

const RadioMore = () => {
  return <div className="rdimore">
    <div className="title">
      <h1 style={{fontSize: "24px"}}>音乐推荐电台</h1>
    </div>
    <div className="radilist">
      <div className="top">
        <div className="topleft"></div>
        <div className="topright"></div>
      </div>
      <div className="bottom">
        <div className="bottomleft"></div>
        <div className="bottomright"></div>
      </div>
    </div>
  </div>;
};

export default RadioMore;
