import { useEffect, useState } from "react";
import "./index.less";

const Aside = () => {
  const [backTop, setBackTop] = useState(0);
  const handleScroll = () => {
    if (document.body.scrollTop || document.documentElement.scrollTop)
      setBackTop(1);
    else setBackTop(0);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <div className="aside">
      <div
        className="back-top"
        style={{
          display: backTop ? "" : "none",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ></div>
    </div>
  );
};

export default Aside;
