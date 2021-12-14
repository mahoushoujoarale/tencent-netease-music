import "./index.less";
import ReactAplayer from "react-aplayer";
import { useEffect, useState } from "react";
import { Slider } from "antd";
import { observer } from "mobx-react";
import store from "@/store";
import { reaction } from "mobx";

interface aplayerI {
  skipBack: () => void;
  toggle: () => void;
  play: () => void;
  skipForward: () => void;
  list: { clear: () => void; add: (audio: DataI[]) => void };
  paused: boolean;
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
}

const SongPlayer = () => {
  const aplayerProps = {
    theme: "rgb(199, 12, 12)",
    lrcType: 3,
    audio: store.playlist,
  };

  const [mode, setMode] = useState(0);
  const [aplayer, setAplayer] = useState<aplayerI>({
    skipBack: () => {},
    toggle: () => {},
    play: () => {},
    skipForward: () => {},
    list: { clear: () => {}, add: () => {} },
    paused: true,
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

  useEffect(() => {
    setPaused(aplayer.paused);
    // console.log(1);
  }, [aplayer.paused]);

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
    <div className="song-player">
      <div className="center">
        <div className="buttons">
          <div
            className="pre"
            title="上一首"
            onClick={() => aplayer.skipBack()}
          ></div>
          <div
            className={"play-button" + (paused ? " pause" : "")}
            title="暂停/播放"
            onClick={() => {
              aplayer.toggle();
              console.log(aplayer);
            }}
          ></div>
          <div
            className="next"
            title="下一首"
            onClick={() => aplayer.skipForward()}
          ></div>
        </div>
        <ReactAplayer
          {...aplayerProps}
          onInit={(ap: aplayerI) => setAplayer(ap)}
        />
        <div className="options">
          <div className="getlyric" title="画中画歌词"></div>
          <div className="like" title="收藏"></div>
          <div className="share" title="分享"></div>
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
            title={mode === 0 ? "循环" : mode === 1 ? "随机" : "单曲循环"}
            onClick={() => changeMode()}
          ></div>
          <div className="list" title="循环列表">
            <div>{store.getPlaylist.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(SongPlayer);
