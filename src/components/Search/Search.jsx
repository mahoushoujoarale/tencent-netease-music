import React from 'react'
import {Select,Input,AutoComplete} from "antd"
import {getSearchSuggest} from "@/apis/search"
import { useEffect,useState } from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
const {Option}=Select

export default function Search(props) {
    const [searchValue,setSearchValue]=useState("");
    const [searchData,setSearchData]=useState([]);
    // const [seleteValue,setSeleteValue]=useState([]);
    const [options,setOptions]=useState([])
    const [searchParams,setSearchParams]=useSearchParams()
    const name={
        songs:"song",
        artists:"artist",
        albums:"album",
        playlists:"playlist"
    }
    const title={
        songs:"单曲",
        artists:"歌手",
        albums:"专辑",
        playlists:"歌单"
    }
    const renderTitle = (title) => (
        <span key={title}>
          {title}
        </span>
      );
      const renderItem = (title,key) => ({
        value: title,
        key:key,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {title}
          </div>
        ),
      });
    useEffect(()=>{
        async function getData(){
            if(searchValue!==""){
                const {result,code}=await getSearchSuggest(searchValue);
                if(code===200){
                     setSearchData(result);
                }
               
            }
        }
        getData();
    },[searchValue])
    useEffect(()=>{
        let res=[];
        // console.log(searchData)
        if(searchData["order"]){
            searchData.order.forEach(i=>{
            let o={};
            o.label=renderTitle(title[i]);
            o.options=[];
            searchData[i].forEach(e=>{
                o.options.push(renderItem(e.name,`/${name[i]}?id=${e.id}`));
            })
            res.push(o);
        })
        setOptions(res);
        }
        
    },[searchData]) 
    let navigate=useNavigate();
    const handleChange=(value,k)=>{
        navigate(k.key);
    }
    const handleSearch=(value)=>{
        setSearchValue(value);
    }
   
    const handleKeyDown=(event)=>{
        if(searchParams.get("keyword")){
            if(searchParams.get("keyword")===event){
                return;
            }
        }
        navigate(`/search?keyword=${event}&type=1`);
        setSearchValue("");
        // setSeleteValue(event);
        // console.log(event);
    }
    return (
        <div className='search'>
            <AutoComplete
            showSearch
            style={props.style?props.style:{width:150}}
            onSelect={handleChange}
            onSearch={handleSearch}
            options={options}
            >
            <Input.Search size="large" placeholder="音乐/视频/电台/用户" onSearch={handleKeyDown}/>
            </AutoComplete>
        </div>
    )
}
