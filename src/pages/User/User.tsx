import React, {useEffect} from "react";
import './User.less'
//import {useLocation} from 'react-router-dom'
import { getUserSubcount } from "@/apis/user";
//import { getUserDetail } from "@/apis/user";
import UserHeader from '../User/components/UserHeader/UserHeader'
import UserContent from "./components/UserContent/UserContent";
import UserSongList from "./components/UserSongList/UserSongList";

const User:React.FC = () => {

  return (<div className="userWrapper">
  <div className="container">
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
  )
};

export default User;
