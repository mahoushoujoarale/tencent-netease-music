import img404URL from "@/assets/images/404.png";
import "./index.less";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="container">
        <img src={img404URL} alt="404了" />
        <p>很抱歉，你要查找的网页找不到</p>
      </div>
    </div>
  );
};

export default NotFound;
