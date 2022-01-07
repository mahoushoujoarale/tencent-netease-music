import React from "react";
import './SingerLeft.less'
import { Link } from "react-router-dom";

const SingerLeft = () => {
    const LinkStyle = {
        color: "#666"
    };

    return <div className="SingerWrap">
        <div>
            <h2 className="Stitle">
                <Link style={LinkStyle} to={'*'}>推荐</Link>
            </h2>
            <ul>
                <li className="Sli_first">推荐歌手</li>
                <li className="Sli"><Link style={LinkStyle} to={'*'}>入驻歌手</Link></li>
            </ul>
        </div>
        <div className="SingerBlock">
            <h2 className="Stitle">华语</h2>
            <ul className="Sul">
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${71}`}>华语男歌手</Link></li>
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${72}`}>华语女歌手</Link></li>
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${73}`}>华语组合/乐队</Link></li>
            </ul>
        </div>
        <div className="SingerBlock">
            <h2 className="Stitle">欧美</h2>
            <ul className="Sul">
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${961}`}>欧美男歌手</Link></li>
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${962}`}>欧美女歌手</Link></li>
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${963}`}>欧美组合/乐队</Link></li>
            </ul>
        </div>
        <div className="SingerBlock">
            <h2 className="Stitle">日本</h2>
            <ul className="Sul">
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${81}`}>日本男歌手</Link></li>
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${82}`}>日本女歌手</Link></li>
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${83}`}>日本组合/乐队</Link></li>
            </ul>
        </div>
        <div className="SingerBlock">
            <h2 className="Stitle">韩国</h2>
            <ul className="Sul">
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${161}`}>韩国男歌手</Link></li>
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${162}`}>韩国女歌手</Link></li>
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${163}`}>韩国组合/乐队</Link></li>
            </ul>
        </div>
        <div className="SingerBlock">
            <h2 className="Stitle">其他</h2>
            <ul className="Sul">
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${"01"}`}>其他男歌手</Link></li>
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${"02"}`}>其他女歌手</Link></li>
                <li className="Sli"><Link style={LinkStyle} to={`/discovery/singer/cat?id=${"03"}`}>其他组合/乐队</Link></li>
            </ul>
        </div>
    </div>;
};

export default SingerLeft;
