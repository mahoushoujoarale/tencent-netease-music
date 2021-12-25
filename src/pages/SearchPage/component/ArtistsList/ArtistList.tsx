import React from "react";
import "./index.less"
import { Link } from "react-router-dom";

const ArtistList=(props:{data:any})=>{
    console.log(props.data);
    return(
        <div>
            {props.data.map((item:{name:string,picUrl:string,id:number})=>{
                return (
                <div className="artistCard" key={item.id}>
                    <Link to={`/artist?id=${item.id}`}><div className="image"><img src={item.picUrl} alt="" /></div></Link>
                    <Link to={`/artist?id=${item.id}`} style={{color:"#333"}}><p className="name">{item.name}</p></Link>
                </div>
                )
                
            })}
        </div>
    )
}

export default ArtistList;