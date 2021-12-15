import React, { useEffect, useState } from "react";
import "./index.less";
import HomeBlockTitle from "../HomeBlockTitle/HomeBlockTitle";
import { getToplist, getToplistById } from "@/apis/home";
import { Link } from "react-router-dom";
import store from "@/store";
import { action } from "mobx";
import { getSongDetail, getSongInList } from "@/apis/song";

interface DataI {
  name: string;
  artist: string;
  url: string;
  cover: string;
}

const HomeTopList = () => {
  const [rank, setRank] = useState([]);

  useEffect(() => {
    async function getData() {
      const { list } = await getToplist();
      const middle = [];
      const data: any = [];
      for (let i = 0; i < 3; i++) {
        middle[i] = await getToplistById({ id: list[i].id });
        data[i] = middle[i].playlist || {};
      }
      setRank(data);
    }
    getData();
  }, []);

  const resetPlaylist = async (id: string) => {
    const data: DataI[] = [];

    const { songs } = await getSongInList({
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

  const addToPlaylist = async (id: string) => {
    const { songs } = await getSongDetail({
      ids: id,
    });

    const data: DataI = {
      name: songs[0].name,
      artist: songs[0].ar[0].name,
      url: `https://music.163.com/song/media/outer/url?id=${songs[0].id}.mp3`,
      cover: songs[0].al.picUrl,
    };

    store.addToPlaylist(data);
  };

  return (
    <div className="home-toplist">
      <HomeBlockTitle name="榜单" href="/discover/toplist" />
      <div className="container">
        {rank.map(
          (playlist: {
            id: string;
            coverImgUrl: string;
            name: string;
            tracks: { id: string; name: string }[];
          }) => {
            return (
              <div className="column" key={playlist.id}>
                <div className="top-box">
                  <Link
                    to={`/discover/toplist?id=${playlist.id}`}
                    className="left"
                    style={{
                      backgroundImage: `url(${playlist.coverImgUrl})`,
                    }}
                  ></Link>
                  <div className="right">
                    <Link
                      to={`/discover/toplist?id=${playlist.id}`}
                      className="listname"
                    >
                      {playlist.name}
                    </Link>
                    <div
                      className="icon play"
                      onClick={action(() => resetPlaylist(playlist.id))}
                    ></div>
                    <div className="icon collect"></div>
                  </div>
                </div>
                <div className="bottom">
                  {playlist.tracks
                    .slice(0, 10)
                    .map(
                      (item: { id: string; name: string }, index: number) => {
                        return (
                          <div className="item" key={item.id}>
                            <span className="number">{index + 1}</span>
                            <Link to={`/song?id=${item.id}`} className="name">
                              {item.name}
                            </Link>
                            <div className="icons">
                              <div
                                className="icon play"
                                onClick={action(() => addToPlaylist(item.id))}
                              ></div>
                              <div className="icon add"></div>
                              <div className="icon collect"></div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  <Link
                    to={`/discover/toplist?id=${playlist.id}`}
                    className="all"
                  >
                    查看全部&gt;
                  </Link>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default HomeTopList;
