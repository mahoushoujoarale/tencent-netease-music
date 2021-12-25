import React from "react";

const ArtistList=(props:{data:any})=>{
    console.log(props.data);
    return(
        <div>
            {props.data.map((item:{name:string,picUrl:string,id:number})=>{
                return (
                <div className="artistCard" key={item.id}>
                    <img src={item.picUrl} alt="" />
                    <div className="name">{item.name}</div>
                </div>
                )
                
            })}
        </div>
    )
}

export default ArtistList;