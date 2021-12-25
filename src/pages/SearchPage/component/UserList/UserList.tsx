import React from "react";

const UserList=(props:{data:any})=>{
    return (
        <div>
            {
                props.data.map((item:{avatarUrl:string,userId:number,nickname:string})=>{
                    return (
                        <div key={item.userId}>
                            <img src={item.avatarUrl} alt="" />{item.nickname}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserList;