import React from "react";
import PopUp from "../PopUp";
import { useNavigate } from "react-router-dom";
import homeIcon from "../../images/Home-icon.png";

function GuessNumPage() {
    const [randomNum, setRandomNum] = React.useState(Math.floor(Math.random()*100) + 1);
    const [prevGuess, setPrevGuess] = React.useState(0)
    const [guess, setGuess] = React.useState("");
    const [guessLeft, setGuessLeft] = React.useState(6);
    const [higher, setHigher] = React.useState(false);
    const [won, setWon] = React.useState(false);
    const [showPopUp, setShowPopUp] = React.useState(false);

    let navigate = useNavigate();

    React.useEffect(() => {
        if (guessLeft === 0 && !won) {
            setShowPopUp(true);
        }
    },[guessLeft, won]);

    function togglePopUp() {
        setShowPopUp(prev => !prev);
    }

    function resetGame() {
        setRandomNum(Math.floor(Math.random()*100) + 1);
        setGuess("");
        setGuessLeft(6);
        setWon(false);
        setShowPopUp(false);
    }

    function handleChange(event) {
        setGuess(event.target.value);
    }

    function makeGuess(){
        if (!won && guessLeft > 0){
            if (1 <= parseInt(guess) && parseInt(guess) <= 100){
                setGuessLeft(prev => prev - 1);
                if (parseInt(guess) === randomNum){
                    setWon(true);
                    setShowPopUp(true);
                } else if (guess > randomNum){
                    setHigher(false);
                } else if (guess < randomNum){
                    setHigher(true);
                }
                setPrevGuess(guess);
                setGuess("");
            } else {
                alert("Invalid Guess!")
            }
        }
    }

    return (
        <>
            <input type="image" alt="" src={homeIcon} onClick={() => navigate("/")} className="home--button"/>
            <main className="main">
                <h1 className="title">Guess the Number</h1>
                <p className="instructions">A random number between 1 and 100 has been chosen, try to figure out what it is in less than 5 guesses!</p>
                <div className="stats">
                    <h3>Guesses Remaining: {guessLeft}</h3>
                </div>
                {showPopUp && <PopUp winText="You Won!" loseText="Ran out of guesses :(" ans={randomNum} onClose={togglePopUp} playAgain={resetGame} won={won} />}
                <input
                    className="guess--input"
                    type="text"
                    placeholder="Enter Number"
                    name="lastName"
                    onChange={handleChange}
                    value={guess}
                    maxLength={3}
                    autoComplete="off"
                />
                <button className="roll--button" onClick={makeGuess}>Guess</button>
                {guessLeft !== 6 && !won && <p className="guess--info">{higher ? <span style={{color: "green"}}>Higher ↑</span> : <span style={{color: "red"}}>Lower ↓</span>} than {prevGuess}</p>}
            
            </main>
        </>    
    );
};

export default GuessNumPage;