import "./index.less";
import SongDetail from "./components/SongDetail/SongDetail";
import SongRelative from "./components/SongRelative/SongRelative";

const Song = () => {
  return (
    <div className="song">
      <div className="song-center">
        <div className="left">
          <SongDetail />
        </div>
        <div className="right">
          <SongRelative />
        </div>
      </div>
    </div>
  );
};

export default Song;
