import React, { useEffect, useRef, useState } from "react";
import HomeBlockTitle from "../HomeBlockTitle/HomeBlockTitle";
import { Carousel } from "antd";
import { getAlbum } from "@/apis/home";
import { Link } from "react-router-dom";
import store from "@/store";
import "./index.less";
import { getAlbumDetail } from "@/apis/album";
import { action } from "mobx";

interface DataI {
  name: string;
  artist: string;
  url: string;
  cover: string;
}

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

  const resetPlaylist = async (id: string) => {
    const data: DataI[] = [];

    const { songs } = await getAlbumDetail({
      id: id,
    });

    songs.map(
      (item: {
        name: string;
        id: string;
        al: { picUrl: string };
        ar: { name: string }[];
      }) =>
        data.push({
          name: item.name,
          artist: item.ar[0].name,
          url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
          cover: item.al.picUrl,
        })
    );

    store.resetPlaylist(data);
  };

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
                                  resetPlaylist(item.id);
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
