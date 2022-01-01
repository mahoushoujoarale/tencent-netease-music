import React, {useEffect, useState} from "react";
import './DJRadio.less'
import RadioHeader from './components/RadioHeader/RadioHeader'
import RadioTop from "./components/RadioTop/RadioTop";
import RadioMore from "./components/RadioMore/RadioMore";
import styled from "@emotion/styled"

const Gbg = styled.div`
   width: ${window.innerWidth * 0.65}px
`;

const DJRadio = () => {
    const [width,setWidth] = useState(0)

    useEffect(()=> {
        // const wid = window.innerWidth
        // setWidth(wid)
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        console.log("width:",width)
        return () => window.removeEventListener("resize", handleWindowResize);
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
