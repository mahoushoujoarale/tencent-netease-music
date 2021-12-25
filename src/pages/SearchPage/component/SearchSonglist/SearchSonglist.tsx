import React from "react";
const SearchSonglist=(props:{data:any})=>{
    return(
        <div>
            {
                props.data.map((item:{id:number,name:string,coverImgUrl:string,creator:{nickname:string,userId:number},trackCount:number,playCount:number,bookCount:number})=>{
                    return (
                        <div key={item.id}>
                            <span><img src={item.coverImgUrl} alt="" /></span>
                            <span>{item.name}</span>
                            <span>{item.trackCount}</span>
                            <span>{`by ${item.creator.nickname}`}</span>
                            <span>{`收藏 ${item.bookCount}`}</span>
                            <span>{`播放 ${item.playCount}`}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default SearchSonglist;