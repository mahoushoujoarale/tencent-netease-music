import React from "react";
import { Link } from "react-router-dom";
import { action } from "mobx";
import {resetPlaylist} from "@/utils"
import "./index.less"

const SearchSonglist=(props:{data:any})=>{
    const handleNumber=(n:number)=>{
        if(n<10000){
            return n.toString();
        }else{
            return (n / 10000).toFixed(2) + '万'
        }
    }
    return(
        <div className="songlist-container"> 
                {
                    props.data.map((item:{id:number,name:string,coverImgUrl:string,creator:{nickname:string,userId:number},trackCount:number,playCount:number,bookCount:number},index:number)=>{
                        return (
                            <div key={item.id} className={`list-item${index%2?" odd":""}`}>
                                <span className="icon" onClick={action(()=>{
                                    resetPlaylist(item.id.toString());
                                })}></span>
                                <Link to={`/playlist?id=${item.id}`} className="songlist-img">
                                    <img src={item.coverImgUrl} alt="" />
                                </Link>
                                <Link to={`/playlist?id=${item.id}`} className="songlist-name">
                                    {item.name}
                                </Link>
                                <span className="text">{item.trackCount}</span>
                                <span className="creator">
                                    {`by `}
                                    <Link to={`/user/home?id=${item.creator.userId}`} className="link">
                                        {item.creator.nickname}
                                    </Link>
                                </span>
                                <span className="text">{`收藏 ${handleNumber(item.bookCount)}`}</span>
                                <span className="text">{`播放 ${handleNumber(item.playCount)}`}</span>
                            </div>
                        )
                    })
                }
        </div>
    )
}
export default SearchSonglist;