import React from "react";
import {ManOutlined,WomanOutlined} from "@ant-design/icons"
import { Link } from "react-router-dom";
import './index.less'
const UserList=(props:{data:any})=>{
    return (
        <div className="userlist">
            {
                props.data.map((item:{avatarUrl:string,userId:number,nickname:string,gender:number},index:number)=>{
                    return (
                        <div key={item.userId} className={`userlist-item${index%2?" odd":""}`}>
                            <Link to={`/user/home?id=${item.userId}`} className="user-img"><img src={item.avatarUrl} alt="" /></Link>
                            <span><Link to={`/user/home?id=${item.userId}`} className="link-user">{item.nickname}</Link>{item.gender===1?<ManOutlined color="#00CCFF"/>:<WomanOutlined color="#FF99CC"/>}</span>
                            <div className="attention"><em>+</em>关注</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserList;