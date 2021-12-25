import React from "react";

const AlbumList=(props:{data:any})=>{
    return (
        <div>
            {
                props.data.map((item:{name:string,picUrl:string,artist:{name:string},id:number})=>{
                    console.log(item);
                    return (
                        <div className="albumCard" key={item.id}>
                            <img src={item.picUrl} alt="" />
                            <div>{item.name}</div>
                            <div>{item.artist.name}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AlbumList;