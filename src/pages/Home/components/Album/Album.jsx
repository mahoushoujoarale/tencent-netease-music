import React, { useEffect, useRef, useState } from "react";
import BlockTitle from "../BlockTitle/BlockTitle";
import { Carousel } from "antd";
import { getAlbum } from "@/apis/home";
import { Link } from "react-router-dom";
import "./index.less";

const loop = [1, 2];

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const rollerRef = useRef();

  useEffect(() => {
    async function getData() {
      const { albums: data = [] } = await getAlbum();
      setAlbums(data.slice(0, 10));
    }
    getData();
  }, []);

  return (
    <div className="album">
      <BlockTitle name="新碟上架" href="/discover/album" />
      <div className="album-roller">
        <Carousel auto dots={false} ref={rollerRef}>
          {loop.map((item, index) => {
            return (
              <div key={index}>
                <ul className="album-container">
                  {albums.slice(index, index + 5).map((item) => {
                    return (
                      <li key={item.id} className="album-card">
                        <Link
                          to={`/album?id=${item.id}`}
                          className="album-img"
                          style={{
                            backgroundImage: `url(${item.picUrl})`,
                          }}
                        ></Link>
                        <Link
                          to={`/album?id=${item.id}`}
                          className="album-title"
                        >
                          {item.name}
                        </Link>
                        <Link
                          to={`/artist?id=${item.artist.id}`}
                          className="artist-name"
                        >
                          {item.artist.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </Carousel>
        <div
          className="arrow prev"
          onClick={() => rollerRef.current.prev()}
        ></div>
        <div
          className="arrow next"
          onClick={() => rollerRef.current.next()}
        ></div>
      </div>
    </div>
  );
};

export default Album;
