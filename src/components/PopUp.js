import React from "react";

function PopUp(props){
    return (
        <div className="modal">
            <div className="modal--content">
                <span className="close" onClick={props.onClose}>
                    &times;
                </span>
                <div className="popup--info">
                    <h1>{props.won ? props.winText : props.loseText}</h1>
                    {!props.won && <h3>Correct answer: {props.ans}</h3>}
                    <button className="restart--button" onClick={props.playAgain}>Play Again</button>
                </div>
                
            </div>
        </div>
    );
};

export default PopUp;