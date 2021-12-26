import React, { useState,useEffect } from 'react'
import { useSearchParams,useLocation } from 'react-router-dom'
import {getSearchData} from '@/apis/search'
import {Menu} from "antd"
import SongsList from "../songsList/SongsList"
import { Spin,Result } from 'antd'
import {FrownOutlined} from "@ant-design/icons"
import ArtistList from '../ArtistsList/ArtistList'
import UserList from '../UserList/UserList'
import AlbumList from '../AlbumList/AlbumList'
import SearchSonglist from '../SearchSonglist/SearchSonglist'
import "./index.less"

export default function Detail() {

    const [searchParams,setSearchParams]=useSearchParams();
    const [type,setType]=useState("1");
    const [keyword,setkeyword]=useState("");
    const [data,setData]=useState([]);
    const location=useLocation();
    const [dataType,setDataType]=useState("0");
    useEffect(() => {
        setType(searchParams.get('type'));
        // console.log(type);
        setkeyword(searchParams.get('keyword'));
        // console.log(keyword);
        setDataType("0");
    },[location] )
    useEffect(()=>{
        async function getData(k,t){
            // console.log(t);
            const {result,code}=await getSearchData(k,t);
            // console.log(result);
            if(code===200){
                for(let k in result){
                    if(Array.isArray(result[k])){
                        setData(result[k]);
                        // console.log(dataType);
                    }
                    if(Number.isInteger(result[k])){
                        if(result[k]===0){
                            setDataType("-1");
                            setData([]);
                        }
                    }
                }
            }else{
                setDataType("-1");
            }
            
        }
        // console.log(keyword,type);
        getData(keyword,type);
    },[type,keyword])
    useEffect(()=>{ 
        if(data.length!==0){
            setDataType(type);//确保在数据取到之后再更新状态
        }
       
    },[data])
    const handleClick=(event)=>{
        setDataType("0");
        setSearchParams({keyword,type:event.key}); 
        setType(event.key);

    }
    return (
        <div className='search-detail'>
            <p className='sum'>{`搜索${searchParams.get('keyword')},共有${data.length}个结果`}</p>
                <Menu onClick={handleClick} selectedKeys={[type]} mode='horizontal' className='guide'>
                    <Menu.Item key="1" className='menu-item'>
                    单曲
                    </Menu.Item>
                    <Menu.Item key="100" className='menu-item'>
                    歌手
                    </Menu.Item>
                    <Menu.Item key="10" className='menu-item'>
                    专辑
                    </Menu.Item>
                    <Menu.Item key="1000" className='menu-item'>
                    歌单
                    </Menu.Item>
                    <Menu.Item key="1002" className='menu-item'>
                    用户
                    </Menu.Item>
                </Menu>
            <div className='show-list'>
                    {dataType==="1"&&<SongsList data={data}/>}
                    {dataType==="10"&&<AlbumList data={data}/>}
                    {dataType==="100"&&<ArtistList data={data}/>}
                    {dataType==="1000"&&<SearchSonglist data={data}/>}
                    {dataType==="1002"&&<UserList data={data}/>}
                    {dataType==="0"&&<Spin/>}
                    {dataType==="-1"&&<Result title="Can't find the data" icon={<FrownOutlined/>}></Result>}
            </div>
        </div>
    )
}
