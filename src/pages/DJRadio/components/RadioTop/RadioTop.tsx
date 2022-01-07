import React, { useState, useEffect } from "react";
import './RadioTop.less'
import { getRecommend } from '@/apis/recommendProgram'
import { getToplist } from "@/apis/toplist";
import { Link } from 'react-router-dom'
import { action } from "mobx";

const RadioTop = () => {
  const [recommend, setRecommend] = useState([])
  const [rankList, setRankList] = useState([])

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
        console.log("setToplist:", res.toplist)
      }
    })
  }, [])



  return <div className="rditop">
    <div className="blk fl">
      <div className="rdiTopTitle">
        <h1 style={{ fontSize: "0.17rem", fontWeight: "normal" }}>推荐节目</h1>
        <Link style={{color:"#333"}} to={'/recommend'}>
        <p className="moreTest1">更多 &gt; </p>
        </Link>
      </div>
      <div className="toplist">
        {
          recommend.map((item: {
            mainSong: { name: string },
            coverUrl: string,
            radio: {
              category: string,
              name: string
            },
            rank: number,
            id: number,
          }, index: number) => {
            return (<div className="listItem" key={item.mainSong.name} >
              <Link to={`/djradio?id=${item.id}`}>
                <img src={item.coverUrl} style={{ width: "40px", height: "40px" }} alt="coverImag" />
              </Link>
              <div className="programName">
                <Link style={{ textDecorationColor: "#666" }} to={`/djradio?id=${item.id}`}>
                  <div className="Text">{item.mainSong.name}</div>
                </Link>
                <Link style={{ textDecorationColor: "#999" }} to={`/djradio?id=${item.id}`}>
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
        <h3 style={{ fontSize: "0.17rem", fontWeight: "normal" }}>节目排行榜</h3>
        <Link style={{color:"#333"}} to={'/rank'}>
        <p className="moreTest">更多 &gt; </p>
        </Link>
      </div>
      <div className="toplist">
        {
          rankList.map((item: {
            program: {
              mainSong: { name: string },
              coverUrl: string,
              radio: { name: string },
            },
            rank: number,
            id: number,
            score: 85,
          }, index: number) => {
            if (index <= 10) {
              index = index + 1;
              return (<div className="listItem" key={item.program.mainSong.name} >
                <h1 className="rank">{item.rank < 10 ? `0${item.rank}` : item.rank}</h1>
                <Link to={`/djradio?id=${item.id}`}>
                  <img src={item.program.coverUrl} style={{ width: "40px", height: "40px" }} alt="coverImag" />
                </Link>
                <div className="rankListName">
                  <Link style={{ textDecorationColor: "#999" }} to={`/djradio?id=${item.id}`}>
                    <div className="Text">{item.program.mainSong.name}</div>
                  </Link>
                  <Link style={{ textDecorationColor: "#999" }} to={`/djradio?id=${item.id}`}>
                    <div className="Text" style={{ marginTop: "-18px", color: "#999" }}>{item.program.radio.name}</div>
                  </Link>
                </div>
                <div className="u-hot">
                  <i className="slide"></i>
                  <i className="slideAfter" style={{ width: `${(item.score % 100) / 100 * 0.6}rem`, transform: `translateX(-0.08rem)`}}></i>
                </div>
              </div>)
            }
          })
        }
      </div>
    </div>
  </div>;
};

export default RadioTop;
