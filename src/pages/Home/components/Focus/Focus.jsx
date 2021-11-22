import React, { useState, useEffect, useRef, useCallback } from "react";
import { Carousel } from "antd";
import { getCarousel } from "@/apis/home";
import { Link } from "react-router-dom";
import "./index.less";

const contentStyle = {
  height: "363.7px",
  color: "#fff",
  lineHeight: "363.7px",
  textAlign: "center",
};

const Focus = () => {
  const [carouselList, setCarouselList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      const { banners: data = [] } = await getCarousel();
      setCarouselList(data);
    }
    getData();
  }, []);

  const bannerRef = useRef();

  return (
    <div
      className="focus"
      style={{
        backgroundImage:
          carouselList[currentIndex] &&
          `url(${carouselList[currentIndex].imageUrl}?imageView&blur=40x20)`,
      }}
    >
      <div className="center">
        <Carousel
          autoplay
          beforeChange={useCallback((from, to) => setCurrentIndex(to), [])}
          ref={bannerRef}
        >
          {carouselList.map((item) => {
            return (
              <div key={item.targetId}>
                <h3 style={contentStyle}>
                  <div>
                    <Link to={`/song?id=${item.targetId}`}>
                      <img
                        style={{ height: "363.7px" }}
                        src={item.imageUrl}
                        alt={item.targetId}
                      />
                    </Link>
                  </div>
                </h3>
              </div>
            );
          })}
        </Carousel>
        <div
          className="arrow prev"
          onClick={() => {
            bannerRef.current.prev();
          }}
        ></div>
        <div
          className="arrow next"
          onClick={() => {
            bannerRef.current.next();
          }}
        ></div>
      </div>
    </div>
  );
};

export default Focus;
