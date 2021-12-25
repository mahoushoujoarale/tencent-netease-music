import React from "react";
import styles from "./RadioHeader.module.less";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const contentStyle = {
  fontSsize: "12px",
  color: "#fff",
  lineHeight: "194px",
  textAlign: "center",
  background: "#444",
  marginLeft: "38px",
};

const Topimage1 = [
  {
    imge: "https://p4.music.126.net/icULXvfqWJMFvcjTrXSLeA==/109951165406422565.jpg",
    name: "情感",
  },
  {
    imge: "https://p4.music.126.net/fWonYYR8sORR2mEKZfYqjQ==/109951165406418703.jpg",
    name: "音乐推荐",
  },
  {
    imge: "https://p4.music.126.net/Tg1Ids_gRSqaZXyZ3zj0Sg==/109951166109395795.jpg",

    name: "有声书",
  },
  {
    imge: "https://p3.music.126.net/LIkzDiW_ktaSbk_s6MgMkg==/109951165406441809.jpg",

    name: "脱口秀",
  },
  {
    imge: "https://p3.music.126.net/GqeTI3A_g4FFzm_4MoNSsQ==/109951165406411412.jpg",

    name: "创作翻唱",
  },
  {
    imge: "https://p4.music.126.net/3qyLawhgmTyHNabhuaKYTg==/109951165406422635.jpg",

    name: "电音",
  },
  {
    imge: "https://p3.music.126.net/wOmtE80i2EMG2dR7DnTJUw==/109951166108735875.jpg",

    name: "知识",
  },
  {
    imge: "https://p4.music.126.net/bOFLdKG966TolZNpA1VYtw==/109951166108595279.jpg",

    name: "二次元",
  },
  {
    imge: "https://p4.music.126.net/bOFLdKG966TolZNpA1VYtw==/109951166108595279.jpg",

    name: "明星专区",
  },
  {
    imge: "https://p3.music.126.net/hxNgvipzXFp570FgkiFGcQ==/109951166108605164.jpg",

    name: "生活",
  },
  {
    imge: "https://p4.music.126.net/X3gH1OSeg5xQV5bqSv-cEg==/109951166108614572.jpg",

    name: "亲子",
  },
  {
    imge: "https://p4.music.126.net/krSruAC4wwq3TXJkcSHvUQ==/109951166108617045.jpg",

    name: "新闻资讯",
  },
  {
    imge: "https://p4.music.126.net/la9HvnMewT3lp72DL-NgKA==/109951166108675738.jpg",

    name: "广播剧",
  },
  {
    imge: "https://p4.music.126.net/4pgJFKZYNU1tZxQdp6xa-A==/109951166111062508.jpg",

    name: "故事",
  },
  {
    imge: "https://p4.music.126.net/HXCbeAs1YDXgOOwE9oY2ew==/109951166111050278.jpg",

    name: "人文历史",
  },
  {
    imge: "https://p3.music.126.net/gFOkDDYZa8m93ccvIlmmvg==/109951166108686306.jpg",

    name: "娱乐",
  },
  {
    imge: "https://p3.music.126.net/BwIOmsgRTVLL1vrVieJD9w==/109951166108695116.jpg",
    name: "相声曲艺",
  },
  {
    imge: "https://p4.music.126.net/W1j-Lb5ozohzud342aPIpw==/109951166108699096.jpg",
    name: "其他",
  },
];

const Topimage2 = [
  {
    imge: "../../../style/web2/img/index_radio/radio_faq.png",
    name: "常见问题",
  },
  {
    imge: "../../../style/web2/img/index_radio/radio_apply.png",
    name: "我要做主播",
  },
];

const RadioHeader = () => {
  function onChange(a, b, c) {
    //console.log(a, b, c);
  }

  return (
    <div>
      <Carousel
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
        afterChange={onChange}
      >
        <div>
          <div style={contentStyle}>
            {Topimage1.map((item) => {
              return (
                <li className={styles.siglebox} key={item.name}>
                  <Link to={"/*"}>
                    <div
                      className={styles.ridHeadericon}
                      style={{ background: "url(" + item.imge + ")" }}
                    ></div>
                  </Link>
                  <Link to={"/*"}>
                    <em className={styles.text}>{item.name}</em>
                  </Link>
                </li>
              );
            })}
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            {Topimage2.map((item) => {
              return (
                <li className={styles.siglebox} key={item.name}>
                  <div
                    className={styles.ridHeadericon}
                    style={{ background: "url(" + item.imge + ")" }}
                  ></div>
                  <em className={styles.text}>{item.name}</em>
                </li>
              );
            })}
          </div>
        </div>
      </Carousel>
      ,
    </div>
  );
};

export default RadioHeader;
