import React from "react";
import Die from "./Die";
import {nanoid} from "nanoid"
import PopUp from "../PopUp";
import { useNavigate } from "react-router-dom";
import homeIcon from "../../images/Home-icon.png";

function TenziesPage() {

  //Generate array of 10 random numbers between 1 and 6
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++){
      newDice.push({
        value: Math.floor(Math.random()*6) + 1,
        isHeld: false,
        id: nanoid()
      });
    }
    //console.log(newDice);
    return newDice;
  }

  //update the values of our dice
  function rollDice() {
    //take perivous state, map each object to either keep the same object or change the number depending if held or not
    if (tenzies){ //reset the game
      setTenzies(false); //game no longer won
      setNumRolls(0);
      setDice(allNewDice()); //generate new dice
      setTime(0); //restart timer
      setShowPopUp(false);
    } else{
      setDice(prevDice => prevDice.map(dice => dice.isHeld ? dice : {...dice, value: Math.floor(Math.random()*6) + 1}));
      setNumRolls(rolls => rolls + 1)
    }
    
  }

  function togglePopUp(){
    setShowPopUp(prev => !prev);
  }

  function holdDice(id) {
    //take the previous state, map its values by checking if the id is the button that was clicked.
    //if id matches, make a new object with same properties except for isHeld
    //Otherwise, return the original die unchanged
    if (!tenzies) setDice(prevDice => prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die));
  }

  //set up state with our die values
  const [dice, setDice] = React.useState(() => allNewDice());

  //tells us whether the game is going or not
  const [tenzies, setTenzies] = React.useState(false);

  //tells us the number of rolls it took
  const [numRolls, setNumRolls] = React.useState(0);

  //state for the timer
  const [time, setTime] = React.useState(0);

  const [showPopUp, setShowPopUp] = React.useState(false);

  let navigate = useNavigate();

  React.useEffect(() => {
    let interval;
    if (!tenzies) { //game is running
      interval = setInterval(() => {  //setInterval runs code after certain time intervals have passed, in this case every 10 ms
        setTime((prevTime) => prevTime + 1); //increase timer by 1 every 1000ms (every second)
      }, 1000);
    } else if (tenzies) {
      clearInterval(interval);  //clearInterval closes the timer that was set with the variable
    }
    return () => clearInterval(interval);
  }, [tenzies]);  //dependent on whether game is going or not

  //tracks whenever the dice state changes
  //keeps 2 pieces of internal state in sync
  React.useEffect(() => {
    //all values must be the same
    let val = dice[0].value;
    for (let i = 0; i < dice.length; i++){
      //if a die is not held or not the value, game is not won
      if (!dice[i].isHeld || dice[i].value !== val){
        return
      }
    }
    setTenzies(true);
    setShowPopUp(true);
    //console.log("You Won!");
  }, [dice]);

  //map die values to die components
  const dieElements = dice.map(die => <Die key={die.id} id={die.id} toggle={holdDice} value={die.value} isHeld={die.isHeld}/>);
  return (
    <>
      <input type="image" alt="" src={homeIcon} onClick={() => navigate("/games-spa")} className="home--button"/>
      <main className="main">

        {showPopUp && <PopUp onClose={togglePopUp} winText="You Won!" playAgain={rollDice} won={true} />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="stats">
          <h3>Rolls: {numRolls}</h3>
          <h3>Time: {time} s</h3>
        </div>
        
        <div className="die--container">
          {dieElements  /* Display all die components */}
        </div>
        <button className="roll--button" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        
      </main>
    </>
  );
}

export default TenziesPage;