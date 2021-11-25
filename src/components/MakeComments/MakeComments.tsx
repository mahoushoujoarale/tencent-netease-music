import { useState } from "react";
import "./index.less";
import user_default_photo from "@/assets/images/user_default_photo.jpg";

const MakeComments = () => {
  const [letters, setLetters] = useState(140);

  const onCommentBoxChange = (event: { target: { value: string } }) => {
    setLetters(140 - event.target.value.length);
  };

  return (
    <div className="make-comments">
      <div className="comment-title">
        评论
        <span>共{24354}条评论</span>
      </div>
      <div className="main-pane">
        <div className="user-photo">
          <img src={user_default_photo} alt="用户头像" />
        </div>
        <div className="right">
          <textarea
            className="input-box"
            maxLength={140}
            placeholder="评论"
            onChange={onCommentBoxChange}
          />
          <div className="push-bar">
            <div className="left">
              <div className="emotions"></div>
              <div className="at-somebody"></div>
            </div>
            <div className="right">
              <span>{letters}</span>
              <div className="comment-button">评论</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeComments;
