import React from "react";
import { Link } from "react-router-dom";
import "./index.less"

const AlbumList=(props:{data:any})=>{
    return (
        <div className="albumContainer">
            <ul className="albumList">
                {
                    props.data.map((item:{name:string,picUrl:string,artist:{name:string,id:number},id:number})=>{
                        console.log(item);
                        return (
                            <li className="albumCard" key={item.id}>
                                <Link className="albumImg" to={`/album?id=${item.id}`}>
                                    <img src={item.picUrl} alt="" />
                                    <span></span>
                                </Link>
                                <Link to={`/album?id=${item.id}`} className="albumTitle">
                                    {item.name}
                                </Link>
                                <Link to={`/artist?id=${item.artist.name}`} className="artistName">
                                    {item.artist.name}
                                </Link>
                             </li>
                        )
                    })
                }
            </ul>
            
        </div>
    )
}

export default AlbumList;