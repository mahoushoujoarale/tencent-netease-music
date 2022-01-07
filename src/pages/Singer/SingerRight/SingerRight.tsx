import React, { useState, useEffect } from "react";
import './SingerRight.less'
import { Link } from "react-router-dom";
import { getSinger } from "@/apis/getSinger";

const SingerRight = () => {

  const [allSingerList, setAllSingerList] = useState([])
  useEffect(() => {
    getSinger({ type: "-1" }, { area: "-1" }).then((res) => {
      if (res.code === 200) {
        setAllSingerList(res.artists)
      }
      console.log("getSinger", res)
    })
  }, [])

  const LinkStyle = {
    color: "#666"
  };


  return <div className="SRWrapper">
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
  </div>;
};

export default SingerRight;
