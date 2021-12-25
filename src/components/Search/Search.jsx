import React from 'react'
import {Select} from "antd"
import {getSearchSuggest} from "@/apis/search"
import { useEffect,useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
const {Option}=Select

export default function Search(props) {
    const [searchValue,setSearchValue]=useState("");
    const [searchData,setSearchData]=useState([]);
    const [seleteValue,setSeleteValue]=useState([]);
    const name={
        songs:"song",
        artists:"artist",
        albums:"album",
        playlists:"playlist"
    }
    useEffect(()=>{
        async function getData(){
            if(searchValue!==""){
                const {result}=await getSearchSuggest(searchValue);
                let res=[];
                result.order.forEach(i=>{
                    result[i].forEach(e=>{
                        e.type=i;
                        res.push(e);
                    })
                })
                setSearchData(res);
            }
            console.log(searchData);
        }
        getData();
    },[searchValue])
    const handleChange=(value,key)=>{
        // console.log(value);
        setSeleteValue(value);
    }
    const handleSearch=(value)=>{
        setSearchValue(value);
    }
    let navigate=useNavigate();
    const handleKeyDown=(event)=>{
        if(event.key==="Enter"&&searchValue!==""){
            navigate(`/search?keyword=${searchValue}&type=1`);
            setSearchValue("");
            setSeleteValue("");
        };
    }
    return (
        <div className='search'>
            <Select 
            showSearch
            style={props.style?props.style:{width:100}}
            placeholder="音乐/视频/电台/用户"
            value={seleteValue}
            onChange={handleChange}
            onSearch={handleSearch}
            onInputKeyDown={handleKeyDown}
            >
            {searchData.map(i=>(
                <Option key={i.id} value={i.name}><Link to={`/${name[i.type]}?id=${i.id}`}>{i.name}</Link></Option>
            ))}
            </Select>
        </div>
    )
}
