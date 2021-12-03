import React, { useState, useEffect, useRef, useCallback } from "react";
import { Carousel } from "antd";
import { getCarousel } from "@/apis/home";
import { Link } from "react-router-dom";
import "./index.less";
import { transfromTarget } from "@/utils";

const contentStyle: any = {
  height: "363.7px",
  color: "#fff",
  lineHeight: "363.7px",
  textAlign: "center",
};

const HomeFocus = () => {
  const [carouselList, setCarouselList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      const { banners } = await getCarousel();

      setCarouselList(banners);
    }
    getData();
  }, []);

  const bannerRef = useRef<any>();

  return (
    <div
      className="home-focus"
      style={{
        backgroundImage:
          carouselList[currentIndex] &&
          `url(${
            (carouselList[currentIndex] as any).imageUrl
          }?imageView&blur=40x20)`,
      }}
    >
      <div className="center">
        <Carousel
          autoplay
          beforeChange={useCallback((from, to) => setCurrentIndex(to), [])}
          ref={bannerRef}
        >
          {carouselList.map(
            (item: {
              targetId: string;
              imageUrl: string;
              targetType: number;
            }) => {
              return (
                <div key={item.targetId}>
                  <h3 style={contentStyle}>
                    <div>
                      <Link
                        to={`/${transfromTarget(item.targetType)}?id=${
                          item.targetId
                        }`}
                      >
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
            }
          )}
        </Carousel>
        <div
          className="arrow prev"
          onClick={() => {
            (bannerRef.current as any).prev();
          }}
        ></div>
        <div
          className="arrow next"
          onClick={() => {
            (bannerRef.current as any).next();
          }}
        ></div>
      </div>
    </div>
  );
};

export default HomeFocus;
