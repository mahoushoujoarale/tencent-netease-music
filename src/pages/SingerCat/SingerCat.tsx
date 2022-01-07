import React, { useState, useEffect } from "react";
import './SingerCat.module.css'
import SingerLeft from "../Singer/SingerLeft/SingerLeft";
import { Link, useLocation } from "react-router-dom";
import { getSinger } from "@/apis/getSinger";

const SingerCat = () => {
  const location = useLocation();
  const id = location.search.slice(4)
  const len = id.length
  const area = id.substring(0,len-1)
  const type = id.substring(len-1);
  console.log("type,area",type," ",area);

  const [allSingerList, setAllSingerList] = useState([])
  useEffect(() => {
    getSinger({ type: type }, { area: area }).then((res) => {
      if (res.code === 200) {
        setAllSingerList(res.artists)
      }
      console.log("getSingerCat", res)
    })
  }, [])

  const LinkStyle = {
    color: "#666"
  };



  return <div className="Singer_bg">
    <div className="Singer_left">
      <SingerLeft />
    </div>
    <div className="Singer_right">

      <div className="SRWrapper">
        <div className="SRTitle">
          <h3 className="SRText">
            <Link style={LinkStyle} to={'*'}>推荐歌手</Link>
          </h3>
          <div className="SRMoreText">
            <Link style={LinkStyle} to={'*'}> 更多 &gt;</Link>
          </div>
        </div>
        <div className="SRSgerlist">
          {
            (allSingerList || []).map((
              item: {
                name: string;
                picUrl: string;
                id: string;
              },
              index: number
            ) => {
              return (<div className="SRSger" key={index}>
                <Link style={LinkStyle} to={`/artist?id=${item.id}`}>
                  <img src={item.picUrl} className="SRSgerImg"></img>
                </Link>
                <div className="SRSgerNameBlock">
                  <Link style={LinkStyle} to={`/artist?id=${item.id}`}>
                    <p className="SRSgerName">{item.name}</p>
                  </Link>
                  <Link style={LinkStyle} to={`/artist?id=${item.id}`}>
                    <div className="SRSgericon"></div>
                  </Link>
                </div>
              </div>
              )
            })
          }
        </div>
        {/* <div className="SRTitle">
      <h3 className="SRText">
        <Link style={LinkStyle} to={'*'}>热门歌手</Link>
      </h3>
      <div className="SRMoreText">
        <Link style={LinkStyle} to={'*'}> 更多 &gt;</Link>
      </div>
    </div>
    <div className="SRSgerlist"></div> */}
      </div>


    </div>
  </div>;
};

export default SingerCat;
