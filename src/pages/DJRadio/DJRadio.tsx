import React from "react";
import './DJRadio.less'
import RadioHeader from './components/RadioHeader/RadioHeader'
import RadioTop from "./components/RadioTop/RadioTop";
import RadioMore from "./components/RadioMore/RadioMore";
const DJRadio = () => {
  return <div className="g_bg">
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
  </div>;
};

export default DJRadio;
