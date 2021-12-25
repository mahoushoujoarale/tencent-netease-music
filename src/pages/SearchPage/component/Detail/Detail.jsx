import React, { useState,useEffect } from 'react'
import { useSearchParams,useLocation } from 'react-router-dom'
import {getSearchData} from '@/apis/search'
import {Menu} from "antd"
import SongsList from "../songsList/SongsList"
import { Spin } from 'antd'
import ArtistList from '../ArtistsList/ArtistList'
import UserList from '../UserList/UserList'
import AlbumList from '../AlbumList/AlbumList'
import SearchSonglist from '../SearchSonglist/SearchSonglist'

export default function Detail() {

    const [searchParams,setSearchParams]=useSearchParams();
    const [type,setType]=useState("1");
    const [keyword,setkeyword]=useState("");
    const [data,setData]=useState([]);
    const location=useLocation();
    const [dataType,setDataType]=useState("0");
    useEffect(() => {
        setType(searchParams.get('type'));
        console.log(type);
        setkeyword(searchParams.get('keyword'));
        console.log(keyword);
        setDataType("0");
    },[location] )
    useEffect(()=>{
        async function getData(k,t){
            console.log(t);
            const {result}=await getSearchData(k,t);
            console.log(result);
            for(let k in result){
                if(Array.isArray(result[k])){
                    setData(result[k]);
                    
                }
            }
        }
        getData(keyword,type);
    },[type,keyword])
    useEffect(()=>{ 
        setDataType(type);
        console.log(data)
       
    },[data])
    const handleClick=(event)=>{
        setDataType("0");
        setSearchParams({keyword,type:event.key}); 
        setType(event.key);

    }
    return (
        <div>
            {`搜索${searchParams.get('keyword')},找到20`}
            <div className='guide'>
                <Menu onClick={handleClick} selectedKeys={[type]} mode='horizontal'>
                    <Menu.Item key="1">
                    单曲
                    </Menu.Item>
                    <Menu.Item key="100">
                    歌手
                    </Menu.Item>
                    <Menu.Item key="10">
                    专辑
                    </Menu.Item>
                    <Menu.Item key="1000">
                    歌单
                    </Menu.Item>
                    <Menu.Item key="1002">
                    用户
                    </Menu.Item>
                </Menu>
                {dataType==="1"&&<SongsList data={data}/>}
                {dataType==="10"&&<AlbumList data={data}/>}
                {dataType==="100"&&<ArtistList data={data}/>}
                {dataType==="1000"&&<SearchSonglist data={data}/>}
                {dataType==="1002"&&<UserList data={data}/>}
                {dataType==="0"&&<Spin/>}
            </div>
        </div>
    )
}
