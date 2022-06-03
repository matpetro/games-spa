import React from "react";
import GameInfo from "./GameInfo";
import data from "../../gameData";

function HomePage() {
    //mapping of data to game components here
    const gameElements = data.map(info => <GameInfo key={info.name} {...info}/>)
    return (
        <div className="games--container">
            {/* displaying of mapped components here */}
            {gameElements}
        </div>
    );

};

export default HomePage;