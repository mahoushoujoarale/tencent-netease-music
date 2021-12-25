import React from 'react'
import Search from '@/components/Search/Search'
import Detail from './component/Detail/Detail';
import "./index.less";

export default function SearchPage() {
    return (
        <div className='searchPage'>
            <div className='seleteInput'>
                <Search style={{width:350}}/>
            </div>
            <div className='pageDetail'>
                <Detail />
            </div>
        </div>
    )
}
