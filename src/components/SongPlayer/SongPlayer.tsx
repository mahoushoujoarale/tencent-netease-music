import "./index.less";
import ReactAplayer from "react-aplayer";
import { useEffect, useState } from "react";
import { Slider } from "antd";
import { observer } from "mobx-react";
import store from "@/store";
import { action, reaction } from "mobx";
import { getLyric } from "../../apis/song";
import { useNavigate } from "react-router-dom";

interface aplayerI {
  skipBack: () => void;
  toggle: () => void;
  play: () => void;
  seek: (time: number) => void;
  skipForward: () => void;
  list: {
    clear: () => void;
    remove: (index: number) => void;
    switch: (index: number) => void;
    add: (audio: DataI[]) => void;
    toggle: () => void;
    hide: () => void;
    audios: DataI[];
    index: number;
  };
  lrc: {
    hide: () => void;
    toggle: () => void;
  };
  paused: boolean;
  on: (event: string, handler: () => void) => void;
  volume: (value: number, nostorage: boolean) => void;
  options: {
    loop: string;
    order: string;
  };
}
interface DataI {
  name: string;
  artist: string;
  url: string;
  cover: string;
  lrc: string;
  id: string;
}

let currentID = "";

const aplayerProps = {
  theme: "rgb(199, 12, 12)",
  lrcType: 1,
  audio: store.playlist,
};

const SongPlayer = () => {
  const [mode, setMode] = useState(0);
  const [showList, setShowList] = useState(false);
  const [lockbar, setLockbar] = useState(false);
  const [aplayer, setAplayer] = useState<aplayerI>({
    skipBack: () => {},
    toggle: () => {},
    play: () => {},
    seek: () => {},
    skipForward: () => {},
    list: {
      clear: () => {},
      add: () => {},
      toggle: () => {},
      hide: () => {},
      remove: () => {},
      switch: () => {},
      audios: [],
      index: 0,
    },
    lrc: {
      hide: () => {},
      toggle: () => {},
    },
    paused: true,
    on: () => {},
    volume: () => {},
    options: {
      loop: "",
      order: "",
    },
  });
  const [volumeBarVisible, setVolumeBarVisible] = useState(false);
  const [paused, setPaused] = useState(true);

  reaction(
    () => store.playlist,
    () => {
      aplayer.list.clear();
      if (store.getPlaylist.length > 0) {
        aplayer.list.add(store.getPlaylist);
        aplayer.play();
      }
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    const picDom: HTMLElement = document.getElementsByClassName(
      "aplayer-button"
    )[0] as HTMLElement;

    picDom.onclick = (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (store.playlist.length) {
        navigate(`/song?id=${currentID}`);
      }
    };
  }, [navigate]);

  useEffect(() => {
    aplayer.on("pause", () => setPaused(true));
    aplayer.on("play", () => setPaused(false));
    aplayer.on("lrcshow", () => setShowList(true));
    aplayer.on("lrchide", () => setShowList(false));
    aplayer.on("canplay", () => {
      const index = aplayer.list.index;

      currentID = aplayer.list.audios[index].id;
    });
    aplayer.on(
      "canplay",
      action(async () => {
        const index = aplayer.list.index;

        if (aplayer.list.audios[index].lrc !== "") return;
        else {
          const {
            lrc: { lyric },
          } = await getLyric({
            id: aplayer.list.audios[index].id,
          });

          store.playlist[index].lrc = lyric;
          store.playlist = [...store.playlist];
          aplayer.list.switch(index);
        }
      })
    );
  }, [aplayer]);

  useEffect(() => {
    aplayer.lrc.hide();
    aplayer.list.hide();
  }, [aplayer.lrc, aplayer.list]);

  const changeMode = () => {
    const newMode = (mode + 1) % 3;
    if (newMode === 0) {
      aplayer.options.loop = "all";
      aplayer.options.order = "list";
    } else if (newMode === 1) {
      aplayer.options.loop = "all";
      aplayer.options.order = "random";
    } else if (newMode === 2) {
      aplayer.options.loop = "one";
    }
    setMode(newMode);
  };

  return (
    <div
      className="song-player"
      style={{ transform: !lockbar && !showList ? "" : "translateY(0)" }}
    >
      <div className="center">
        <div className="buttons">
          <div
            className="pre"
            title="?????????"
            onClick={() => aplayer.skipBack()}
          ></div>
          <div
            className={"play-button" + (paused ? " pause" : "")}
            title="??????/??????"
            onClick={() => {
              aplayer.toggle();
            }}
          ></div>
          <div
            className="next"
            title="?????????"
            onClick={() => aplayer.skipForward()}
          ></div>
        </div>
        <ReactAplayer
          {...aplayerProps}
          onInit={(ap: aplayerI) => setAplayer(ap)}
        />
        <div className="options">
          <div className="getlyric" title="???????????????"></div>
          <div className="like" title="??????"></div>
          <div className="share" title="??????"></div>
        </div>
        <div className="control">
          <div
            className="volume"
            onClick={() => setVolumeBarVisible(!volumeBarVisible)}
          ></div>
          <div
            className="volume-bar"
            style={{ display: volumeBarVisible ? "" : "none" }}
          >
            <Slider
              vertical
              defaultValue={70}
              tooltipVisible={false}
              onChange={(value: number) => aplayer.volume(value / 100, true)}
            />
          </div>
          <div
            className={
              "mode" +
              (mode === 0 ? " loop" : mode === 1 ? " random" : " oneloop")
            }
            title={mode === 0 ? "??????" : mode === 1 ? "??????" : "????????????"}
            onClick={() => changeMode()}
          ></div>
          <div
            className="list"
            title="????????????"
            onClick={() => {
              aplayer.list.toggle();
              aplayer.lrc.toggle();
            }}
          >
            <div>{store.getPlaylist.length}</div>
          </div>
        </div>
        <div className="list-title" style={{ display: showList ? "" : "none" }}>
          <div className="left">
            <div className="title">????????????({store.getPlaylist.length})</div>
            <div className="right">
              <div className="like-all">
                <span></span>????????????
              </div>
              <div
                className="remove"
                onClick={action(() => {
                  aplayer.seek(0);
                  aplayer.list.clear();
                  store.clearPlaylist();
                })}
              >
                <span></span>??????
              </div>
            </div>
          </div>
          <div
            className="close"
            onClick={() => {
              aplayer.list.hide();
              aplayer.lrc.hide();
            }}
          ></div>
        </div>
      </div>
      <div className="lock-bar">
        <div className="lock-box">
          <div
            className="lock"
            style={{ backgroundPositionX: lockbar ? "" : "-80px" }}
            onClick={() => setLockbar(!lockbar)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default observer(SongPlayer);
