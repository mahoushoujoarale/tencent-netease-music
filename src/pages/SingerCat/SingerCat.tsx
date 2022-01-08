import React, { useState, useEffect } from "react";
import './SingerCat.module.css'
import SingerLeft from "../Singer/SingerLeft/SingerLeft";
import { Link, useLocation } from "react-router-dom";
import { getSinger } from "@/apis/getSinger";
import { stringify } from "querystring";

const SingerCat = () => {
  const [allSingerList, setAllSingerList] = useState([])
  // const [name,setName] = useState("");

  const location = useLocation();
  const infor:string = decodeURI(location.search).slice(4)
  const loc = infor.indexOf("&")
  const area = infor.substring(0,loc-1)
  const type = infor.substring(loc-1,loc);
  // setName(infor.substring(loc+6))
  const name = infor.substring(loc+6)
  console.log("type,area",type," ",area, name);



  useEffect(() => {
    getSinger({ type: type }, { area: area }).then((res) => {
      if (res.code === 200) {
        setAllSingerList(res.artists)
      }
      console.log("getSingerCat", res)
    })
  }, [name])

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
            <Link style={LinkStyle} to={'*'}>{decodeURI(name)}</Link>
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
