import { useEffect } from "react";
import PlaylistDetail from "./components/PlaylistDetail/PlaylistDetail";
import PlaylistRelative from "./components/PlaylistRelative/PlaylistRelative";
import "./index.less";

const Playlist = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="playlist">
      <div className="playlist-center">
        <div className="left">
          <PlaylistDetail />
        </div>
        <div className="right">
          <PlaylistRelative />
        </div>
      </div>
    </div>
  );
};

export default Playlist;
