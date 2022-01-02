import React, {useEffect, useState} from "react";
import './DJRadio.less'
import RadioHeader from './components/RadioHeader/RadioHeader'
import RadioTop from "./components/RadioTop/RadioTop";
import RadioMore from "./components/RadioMore/RadioMore";
import styled from "@emotion/styled"
import lib from "@ant-design/icons";

const Gbg = styled.div`
   //width: ${window.innerWidth * 0.65}px
   //width: 10rem
`;

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

const DJRadio = () => {
    const [width,setWidth] = useState(0)

    useEffect(()=> {
        // const wid = window.innerWidth
        // setWidth(wid)
        // const handleWindowResize = () => setWidth(window.innerWidth);
        // window.addEventListener("resize", handleWindowResize);
        // console.log("width:",width)
        // return () => window.removeEventListener("resize", handleWindowResize);
        refreshRem()
    }, [])

  return <Gbg className="g_bg">
      <div className="rdiWrapper">
          <div className="radheader">
              <RadioHeader></RadioHeader>
          </div>
          <div className="riditop">
              <RadioTop></RadioTop>
          </div>
          <div className="ridimore">
              <RadioMore></RadioMore>
          </div>
          <div className="ridimore"></div>
          <div className="ridimore"></div>
          <div className="ridimore"></div>
          <div className="ridimore"></div>
      </div>
  </Gbg>;
};

export default DJRadio;
