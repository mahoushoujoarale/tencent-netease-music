import React, { useState, useEffect } from "react";
import './RadioTop.less'
import { getRecommend } from '@/apis/recommendProgram'
import { getToplist } from "@/apis/toplist";
import { useNavigate, Link } from 'react-router-dom'
import { action } from "mobx";

const RadioTop = () => {
  const [recommend, setRecommend] = useState([])
  const [rankList, setRankList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getRecommend().then((res) => {
      if (res.code === 200) {
        setRecommend(res.programs)
        //console.log("setRecommend:", res.programs)
      }
    })
  }, [])

  useEffect(() => {
    getToplist({ limit: 10 }).then((res) => {
      if (res.code === 200) {
        setRankList(res.toplist)
        //console.log("setToplist:", res.toplist)
      }
    })
  }, [])



  return <div className="rditop">
    <div className="blk fl">
      <div className="rdiTopTitle">
        <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>推荐节目</h1>
      </div>
      <div className="toplist">
        {
          recommend.map((item) => {
            return (<div onClick={action(() => { navigate(`/playlist?id=${item.mainTrackId}`) })} className="listItem" key={item.mainSong.name} >
              <Link to={`/playlist?id=${item.mainTrackId}`}>
                <img src={item.coverUrl} style={{ width: "40px", height: "40px" }} alt="coverImag" />
              </Link>
              <div className="programName">
                <Link style={{ textDecorationColor: "#666" }} to={`/playlist?id=${item.mainTrackId}`}>
                  <div className="Text" style={{ textOverflow: "ellipsis" }}>{item.mainSong.name}</div>
                </Link>
                <Link style={{ textDecorationColor: "#999" }} to={`/playlist?id=${item.mainTrackId}`}>
                  <div className="Text" style={{ marginTop: "-18px", color: "#999" }}>{item.radio.name}</div>
                </Link>
              </div>
              <Link style={{ textDecorationColor: "#999" }} to={`*`}>
                <div className="itemCategory">{item.radio.category}</div>
              </Link>
            </div>)
          })
        }
      </div>
    </div>
    <div className="blk fr">
      <div className="rdiTopTitle">
        <h3 style={{ fontSize: "24px", fontWeight: "normal" }}>节目排行榜</h3>
      </div>
      <div className="toplist">
        {
          rankList.map((item) => {
            return (<div className="listItem" onClick={action(() => { navigate(`/playlist?id=${item.program.id}`) })} key={item.program.mainSong.name} >
              <h1 className="rank">{item.rank < 10 ? `0${item.rank}` : item.rank}</h1>
              <Link to={`/playlist?id=${item.mainTrackId}`}>
                <img src={item.program.coverUrl} style={{ width: "40px", height: "40px" }} alt="coverImag" />
              </Link>
              <div className="rankListName">
                <Link style={{ textDecorationColor: "#999" }} to={`/playlist?id=${item.mainTrackId}`}>
                  <div className="Text">{item.program.mainSong.name}</div>
                </Link>
                <Link style={{ textDecorationColor: "#999" }} to={`/playlist?id=${item.mainTrackId}`}>
                  <div className="Text" style={{ marginTop: "-18px", color: "#999" }}>{item.program.radio.name}</div>
                </Link>
              </div>
              <div className="u-hot">
                <i className="slide"></i>
                <i className="slideAfter" style={{ width: "85%" }}></i>
              </div>
            </div>)
          })
        }
      </div>
    </div>
  </div>;
};

export default RadioTop;
