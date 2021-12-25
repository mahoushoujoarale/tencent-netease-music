import React from 'react'
import { useSearchParams } from 'react-router-dom'
export default function Detail() {
    const [searchParams,setSearchParams]=useSearchParams();
    return (
        <div>
            {`搜索${searchParams.get('keyword')},找到20`}
        </div>
    )
}
