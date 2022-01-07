import React, {useEffect} from "react";
import './Singer.less'
import SingerLeft from "./SingerLeft/SingerLeft";
import SingerRight from "./SingerRight/SingerRight";

const refreshRem = () => {
  var docEl = window.document.documentElement;
  var width = docEl.getBoundingClientRect().width;
  if (width <= 800) {
      width = 800
  }
  var rem = width / 10;
  docEl.style.fontSize = rem + 'px';
  console.log("rem:, width",rem, width);
  window.addEventListener('resize', refreshRem);
}

const Singer = () => {

  useEffect(()=> {
    refreshRem();
  },[])
    
  return <div className="Singer_bg">
    <div className="Singer_left">
      <SingerLeft/>
    </div>
    <div className="Singer_right">
      <SingerRight/>
    </div>
  </div>;
};

export default Singer;
