import React from 'react'
import { useEffect,useState } from 'react';
import {Spin} from "antd"
const SongsList=(props:{data:any})=> {
    const date=new Date();
    const [list,setList]=useState((<Spin />));
    useEffect(()=>{
        console.log(props.data);
        const show=props.data.map((item:any)=>{
            return (<li key={item.id}>
                <span className="content">{item.name}</span>
                <span className="content">{item.artists[0].name}</span>
                <span className="content">{item.album.name}</span>
            </li>)
        })
        setList(show);
    },[props.data])
    return (
        <div>
            <ul>
                {list}
            </ul>
        </div>
    )
}

export default SongsList;
