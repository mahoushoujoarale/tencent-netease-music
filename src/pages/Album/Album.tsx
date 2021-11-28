import { useEffect } from "react";
import AlbumDetail from "./components/AlbumDetail/AlbumDetail";
import AlbumRelative from "./components/AlbumRelative/AlbumRelative";
import "./index.less";

const Album = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="album">
      <div className="album-center">
        <div className="left">
          <AlbumDetail />
        </div>
        <div className="right">
          <AlbumRelative />
        </div>
      </div>
    </div>
  );
};

export default Album;
