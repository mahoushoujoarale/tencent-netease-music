import React from "react";
import {useState,useEffect} from "react";
import {getTopPlayList} from "@/apis/topPlaylist"
import Seleter from "./component/Seleter/Seleter";
const TopPlayList=()=>{
   return(
       <div>
           <Seleter />
       </div>
   )
}

export default TopPlayList;