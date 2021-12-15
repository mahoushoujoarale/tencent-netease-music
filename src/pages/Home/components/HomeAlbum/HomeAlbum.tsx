import React, { useEffect, useRef, useState } from "react";
import HomeBlockTitle from "../HomeBlockTitle/HomeBlockTitle";
import { Carousel } from "antd";
import { getAlbum } from "@/apis/home";
import { Link } from "react-router-dom";
import "./index.less";
import { action } from "mobx";
import { resetPlaylistByAlbum } from "@/utils";

const loop = [1, 2];

const HomeAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const rollerRef = useRef<any>();

  useEffect(() => {
    async function getData() {
      const { albums } = await getAlbum();
      setAlbums(albums.slice(0, 10));
    }

    getData();
  }, []);

  return (
    <div className="home-album">
      <HomeBlockTitle name="新碟上架" href="/discover/album" />
      <div className="album-roller">
        <Carousel dots={false} ref={rollerRef}>
          {loop.map((loopCount: unknown, index: number) => {
            return (
              <div key={index}>
                <ul className="album-container">
                  {albums
                    .slice(index, index + 5)
                    .map(
                      (item: {
                        id: string;
                        name: string;
                        picUrl: string;
                        artist: { id: string; name: string };
                      }) => {
                        return (
                          <li key={item.id} className="album-card">
                            <Link
                              to={`/album?id=${item.id}`}
                              className="album-img"
                            >
                              <img src={item.picUrl} alt="封面" />
                              <span
                                onClick={action((event) => {
                                  event?.preventDefault();
                                  resetPlaylistByAlbum(item.id);
                                })}
                              ></span>
                            </Link>
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
                      }
                    )}
                </ul>
              </div>
            );
          })}
        </Carousel>
        <div
          className="arrow prev"
          onClick={() => (rollerRef.current as any).prev()}
        ></div>
        <div
          className="arrow next"
          onClick={() => (rollerRef.current as any).next()}
        ></div>
      </div>
    </div>
  );
};

export default HomeAlbum;
