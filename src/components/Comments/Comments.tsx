import "./index.less";
import comment_vip_icon from "@/assets/images/comment_vip_icon.png";
import { formatTime } from "@/utils";
import { Link } from "react-router-dom";

const Comments = (props: {
  commentInfo: {
    beReplied: [];
    content: string;
    user: {
      nickname: string;
      userId: string;
      avatarUrl: string;
      avatarDetail: { identityIconUrl: string } | null;
      vipType: number;
    };
    time: string;
    commentId: string;
    likedCount: number;
  };
}) => {
  return (
    <div className="comments">
      <Link
        to={`/user/home?id=${props.commentInfo.user.userId}`}
        className="user-photo"
      >
        <img src={props.commentInfo.user.avatarUrl} alt="用户头像" />
      </Link>
      <div className="comment-box">
        <div className="top-bar">
          <div className="user-info">
            <Link
              to={`/user/home?id=${props.commentInfo.user.userId}`}
              className="user-name"
            >
              {props.commentInfo.user.nickname}
            </Link>
            <img
              src={
                props.commentInfo.user.avatarDetail
                  ? props.commentInfo.user.avatarDetail.identityIconUrl
                  : ""
              }
              alt="icon"
              className="icon"
              style={{
                display: props.commentInfo.user.avatarDetail ? "" : "none",
              }}
            />
            <img
              src={comment_vip_icon}
              alt="icon-vip"
              className="icon-vip"
              style={{ display: props.commentInfo.user.vipType ? "" : "none" }}
            />
            <span>:</span>
          </div>
          {props.commentInfo.content}
        </div>
        <div
          className="reply-box"
          style={{ display: props.commentInfo.beReplied.length ? "" : "none" }}
        >
          {props.commentInfo.beReplied.map(
            (item: {
              beRepliedCommentId: string;
              content: string;
              user: {
                nickname: string;
                userId: string;
                avatarDetail: { identityIconUrl: string };
                vipType: number;
              };
            }) => (
              <div className="reply-item" key={item.beRepliedCommentId}>
                <div className="user-info">
                  <Link
                    to={`/user/home?id=${item.user.userId}`}
                    className="user-name"
                  >
                    {item.user.nickname}
                  </Link>
                  <img
                    src={
                      item.user.avatarDetail
                        ? item.user.avatarDetail.identityIconUrl
                        : ""
                    }
                    alt="icon"
                    className="icon"
                    style={{
                      display: item.user.avatarDetail ? "" : "none",
                    }}
                  />
                  <img
                    src={comment_vip_icon}
                    alt="icon-vip"
                    className="icon-vip"
                    style={{
                      display: item.user.vipType ? "" : "none",
                    }}
                  />
                  <span>:</span>
                </div>
                {item.content}
              </div>
            )
          )}
        </div>
        <div className="bottom-bar">
          <div className="time-stamp">{formatTime(props.commentInfo.time)}</div>
          <div className="buttons">
            <div className="like">({props.commentInfo.likedCount})</div>
            <span>|</span>
            <div className="reply">回复</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
