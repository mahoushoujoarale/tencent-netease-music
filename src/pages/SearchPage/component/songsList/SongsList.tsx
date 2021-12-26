import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {action} from "mobx"
import {addToPlaylist} from "@/utils"
import "./index.less"
const SongsList=(props:{data:any})=> {
    useEffect(()=>{
        console.log(props.data);
    },[props.data])
    return (
        <div>
            {props.data.map((item:any,index:number)=>{
            return (<div key={item.id} className={`songItem${index%2===0?"":" odd"}`}>
                <em className='icon' onClick={action(()=>addToPlaylist(item.id))}></em>
                <span className="content"><Link to={`/song?id=${item.id}`} style={{color:"#333"}}>{item.name}</Link></span>
                <span className="content"><Link to={`/artist?id=${item.artists[0].id}`} style={{color:"#333"}}>{item.artists[0].name}</Link></span>
                <span className="content"><Link to={`/album?id=${item.album.id}`} style={{color:"#333"}}>{item.album.name}</Link></span>
            </div>)
        })}
        </div>
    )
}

export default SongsList;
