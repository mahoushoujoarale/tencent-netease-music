import "./RadioplayRight.less";
import { Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecommendDJprogram } from "@/apis/getDJdetail";
import DownloadApps from "@/components/DownloadApps/DownloadApps";

const RadioplayRight = () => {
  const [recommendDJList, setRecommendDJList] = useState([]);

  useEffect(() => {
      getRecommendDJprogram().then ((res)=> {
        if (res.code === 200) {
          console.log("recommendDJList:",res);
          setRecommendDJList(res.result)
        } 
      })
  }, []);

  return (
    <div className="playlist-relative">
      <div className="title">你可能也喜欢</div>
      <div className="related-playlist-container">
        {(recommendDJList || []).map(
          (item: {
            name: string;
            id: number;
            mainSong: {artists: [{name: string}]},
            picUrl: string;
          }) => (
            <div className="item" key={item.id}>
              <Link to={`/djradio?id=${item.id}`} className="cover">
                <img src={item.picUrl} alt="封面" />
              </Link>
              <div className="desc">
                <Link to={`/djradio?id=${item.id}`} className="simi-list">
                  {item.name}
                </Link>
                <span>by</span>
                <Link
                  to={`*`}
                  className="list-creator"
                >
                  {item.mainSong.artists[0].name}
                </Link>
              </div>
            </div>
          )
        )}
      </div>
      <DownloadApps />
    </div>
  );
};

export default RadioplayRight;

