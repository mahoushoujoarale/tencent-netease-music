import { useEffect } from "react";
import RadioplayContent from "./components/RadioplayContent/RadioplayContent";
import RadioplayRight from "./components/RadioplayRight/RadioplayRight";
import "./RadioplayList.less";

const RadioplayList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="RPlaylist">
      <div className="playlist-center">
        <div className="left">
          <RadioplayContent />
        </div>
        <div className="right">
          <RadioplayRight />
        </div>
      </div>
      llllllaaaaaaaa
    </div>
  );
};

export default RadioplayList;
