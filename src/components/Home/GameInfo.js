import React from "react";
import { useNavigate } from "react-router-dom";

function GameInfo(props) {
    const navigate = useNavigate();
    return (
        <div className="game--info" onClick={() => navigate(`/games-spa/${props.name.replaceAll(" ", "").toLowerCase()}`)}>
            <img alt="" className="game--pic" src={props.logo}></img>
            <div className="game--name">{props.name}</div>
        </div>
    );
};

export default GameInfo;