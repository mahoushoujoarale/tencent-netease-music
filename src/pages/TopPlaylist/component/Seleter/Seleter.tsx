
import React from "react";
import { useState,useEffect } from "react";
import {getPlaylistTag} from "@/apis/topPlaylist"
import {DownOutlined} from "@ant-design/icons"
import {Dropdown} from "antd"
import { Link } from "react-router-dom";
import "./index.less"
const Seleter=()=>{
    const [type,setType]=useState("全部");
    let tagList:any=[];
    useEffect(()=>{
        const getTag=async ()=>{
        const {sub,categories}=await getPlaylistTag();
        let res:any={"语种":[],"风格":[],"场景":[],"情感":[],"主题":[]};
        for(let k in categories){
            res[categories[k]]=sub.filter((i:any)=>i.category.toString()===k);
        }
        tagList=res;
        console.log(tagList);
        }
        getTag();
    },[]) 
    const tags=(
        <div>
            <div className="tagHeader">
                <button>全部风格</button>
            </div>
            <div className="showTags">
                <div className="leftTag">
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    );
    return(
        <div className="seleter">
            <span className="type">{type}</span>
            <Dropdown overlay={tags} trigger={['click']} arrow>
                <button className="selete">
                <i>选择分类</i>
                <em><DownOutlined style={{color:"#0C73C2"}}/></em>
            </button>
            </Dropdown>
            
            <div className="hot">热门</div>
        </div>
    )
}

export default Seleter;