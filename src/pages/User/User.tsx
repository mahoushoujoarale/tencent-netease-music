import React from "react";
import "./User.less";
import UserHeader from "../User/components/UserHeader/UserHeader";
import UserContent from "./components/UserContent/UserContent";
import UserSongList from "./components/UserSongList/UserSongList";

const User: React.FC = () => {
  return (
    <div className="userWrapper">
      <div className="user-container">
        <div className="userHeader">
          <UserHeader />
        </div>
        <div className="userContent">
          <UserContent></UserContent>
        </div>
        <div className="songList">
          <UserSongList></UserSongList>
        </div>
      </div>
    </div>
  );
};

export default User;
