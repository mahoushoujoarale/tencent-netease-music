import React from 'react'
import {Link} from "react-router-dom"
import {formatPlayCount,resetPlaylist} from "@/utils"
import {action} from "mobx"
const PlaylistItem=(props:{item:any})=>{
    const {item}=props;
    return (
        <div className="item">
            <Link to={`/playlist?id=${item.id}`}>
            <div
                className="content"
                style={{ backgroundImage: `url(${item.picUrl})` }}
            >
                <div
                className="bottom"
                onClick={(event) => event.preventDefault()}
                >
                <div className="count">
                    {formatPlayCount(item.playCount)}
                </div>
                <div
                    className="play"
                    onClick={action((event) => {
                    event.preventDefault();
                    resetPlaylist(item.id);
                    })}
                ></div>
                </div>
            </div>
            </Link>
            <Link to={`/playlist?id=${item.id}`}>
            <div className="name">{item.name}</div>
            </Link>
        </div>
    )
}
