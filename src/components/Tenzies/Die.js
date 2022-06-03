import React from "react";

function Die(props){
    //conditional styling below
    const styles = {
        background: props.isHeld ? "#59E391" : "#FFFFFF"
    }
    return (
        
        <div className="die" style={styles} onClick={() => props.toggle(props.id)}>
            <h2> {props.value} </h2>
        </div>
    );
}

export default Die;