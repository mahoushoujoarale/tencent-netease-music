import React, { useState, useEffect } from "react";
import './RadioMore.less'
import { getRecommendType } from "@/apis/recommendType";
import { useNavigate, Link } from "react-router-dom";

const RadioMore = () => {
  const [recommendType, setRecommendType] = useState([
    [
      { picUrl: 'https://p2.music.126.net/BHylP_pUA44toT4D9d-O4g==/109951166254078956.jpg', name: "硬地电台", rcmdtext: '硬地原创音乐榜·独家播客企划', id:'965246579' },
      { picUrl: "https://p2.music.126.net/7vp_Ol1ZzF01uDb0-cMliA==/109951165933712260.jpg", name: "民谣之声～每天听的歌～", rcmdtext: "【独家】DJ徐亮精选，陪你听听歌", id:'961317563' },
      { picUrl: "https://p1.music.126.net/YjNOWzSW96soVbC8MZ4JIA==/109951166148077619.jpg", name: "JUNGLE RADIO", rcmdtext: "提供贴合当下情景与心境的MIX", id:'959536083' },
      { picUrl: "https://p1.music.126.net/l1XyA1qxgc9y-ji6IX1dcw==/109951165666492923.jpg", name: "维维道来", rcmdtext: "【独家】刘维首档音乐播客",id:'958009761' }
    ],
  ])
  const [use, setUse] = useState(false)
  const [life, setLife] = useState(false)
  const navigate = useNavigate();

  //创作翻唱
  useEffect(() => {
    getRecommendType({ type: 2001 }).then((res) => {
      if (res.code === 200) {
        let temp = recommendType;
        temp.push(res.djRadios);
        setRecommendType(temp)
        //console.log("创作翻唱", recommendType, "res.djRadios", res.djRadios)
      }
      setUse(!use)
    })
  }, [])
  //生活
  useEffect(() => {
    getRecommendType({ type: 6 }).then((res) => {
      if (res.code === 200) {
        let temp = recommendType;
        temp.push(res.djRadios);
        setRecommendType(temp)
        //console.log("生活", recommendType, "res.djRadios", res.djRadios)
      }
    })
  }, [])
  //情感
  useEffect(() => {
    getRecommendType({ type: 3 }).then((res) => {
      if (res.code === 200) {
        let temp = recommendType;
        temp.push(res.djRadios);
        setRecommendType(temp)
        //console.log("情感", recommendType, "res.djRadios", res.djRadios)
        setLife(!life)
      }
    })
  }, [])
  //知识
  useEffect(() => {
    getRecommendType({ type: 11 }).then((res) => {
      if (res.code === 200) {
        let temp = recommendType;
        temp.push(res.djRadios);
        setRecommendType(temp)
        console.log("getRecommendType",res.djRadios)
      }
      setUse(!use)
    })
  }, [])

  return <div>
    {
      recommendType.map((item) => {
        return (<div className="rdimore">
          <div className="rdimoreTitle">
            <h1 style={{ fontSize: "0.17rem" }}>{item[0].category === undefined ? "音乐推荐" : item[0].category}电台</h1>
          </div>
          <div className="radilist" key={item}>
            <div className="top">
              <div className="topleft">
                <Link to={`/djradio?id=${item[0].id}`}>
                  <img className="topleftImg" src={recommendType === null ? '' : item[0].picUrl} alt=""></img>
                </Link>
                <div className="ridText">
                  <Link style={{textDecorationColor: "#666"}} to={`/djradio?id=${item[0].id}`}>
                  <p style={{ fontSize: "0.15rem", color: "#333" }}>{item[0].name}</p>
                  </Link>
                  <p style={{ fontSize: "0.09rem", color: "#999" }}>{item[0].rcmdtext}</p>
                </div>
              </div>
              <div className="topright">
                <Link to={`/djradio?id=${item[1].id}`}>
                  <img className="topleftImg" src={recommendType == null ? '' : item[1].picUrl} alt=""></img>
                </Link>
                <div className="ridText">
                <Link style={{textDecorationColor: "#666"}} to={`/djradio?id=${item[1].id}`}>
                  <p style={{ fontSize: "0.15rem", color: "#333" }}>{item[1].name}</p>
                  </Link>
                  <p style={{ fontSize: "0.09rem", color: "#999" }}>{item[1].rcmdtext}</p>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="bottomleft">
                <Link to={`/djradio?id=${item[2].id}`}>
                  <img className="topleftImg" src={recommendType == null ? '' : item[2].picUrl} alt=""></img>
                </Link>
                <div className="ridText">
                <Link style={{textDecorationColor: "#666"}} to={`/djradio?id=${item[2].id}`}>
                  <p style={{ fontSize: "0.15rem", color: "#333" }}>{item[2].name}</p>
                  </Link>
                  <p style={{ fontSize: "0.09rem", color: "#999" }}>{item[2].rcmdtext}</p>
                </div>
              </div>
              <div className="bottomright">
                <Link to={`/djradio?id=${item[3].id}`}>
                  <img className="topleftImg" src={recommendType == null ? '' : item[3].picUrl} alt=""></img>
                </Link>
                <div className="ridText">
                <Link style={{textDecorationColor: "#666"}} to={`/djradio?id=${item[3].id}`}>
                  <p style={{ fontSize: "0.15rem", color: "#333" }}>{item[3].name}</p>
                  </Link>
                  <p style={{ fontSize: "0.09rem", color: "#999" }}>{item[3].rcmdtext}</p>
                </div>
              </div>
            </div>
          </div>
        </div>)
      })
    }
  </div>
};

export default RadioMore;
