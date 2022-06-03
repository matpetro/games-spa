import React from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../../images/Home-icon.png";
import PopUp from "../PopUp";

function TicTacToePage() {
    let navigate = useNavigate();

    const [board, setBoard] = React.useState([["", "", ""], ["", "", ""], ["", "", ""]]);
    const [xTurn, setxTurn] = React.useState(true);
    const [won, setWon] = React.useState(false);
    const [tie, setTie] = React.useState(false);
    const [showPopUp, setShowPopUp] = React.useState(false);

    function makeMove(event) {
        if (!won){
            const cell = event.currentTarget;
            const marker = xTurn ? "X" : "O";
            cell.innerHtml = marker;
            setBoard(prev => {
                //need to ensure we are returning something other than prev or state does not update properly
                let newArr = prev.map(row => row.slice());
                newArr[parseInt(cell.dataset.row)][parseInt(cell.dataset.col)] = marker;
                return newArr;
            })
            setxTurn(prev => !prev);
        }
    };

    function togglePopUp() {
        setShowPopUp(prev => !prev);
    };

    function restartGame() {
        setBoard([["", "", ""], ["", "", ""], ["", "", ""]]);
        setxTurn(true);
        setWon(false);
        setShowPopUp(false);
        setTie(false);
    };

    React.useEffect(() => {
        let full = true;
        for (let row = 0; row < board.length; row++){
            if (board[row].includes("")) full = false; 
            if (board[row][0] !== "" && board[row][1] === board[row][0] && board[row][1] === board[row][2]){
                setWon(true);
                setShowPopUp(true);
            }
        }
        for (let col = 0; col < board.length; col++){
            if (board[0][col] !== "" && board[1][col] === board[0][col] && board[1][col] === board[2][col]){
                setWon(true);
                setShowPopUp(true);
            }
        }

        if (board[1][1] !== "" && ((board[0][0] === board[1][1] && board[1][1] === board[2][2]) || (board[0][2] === board[1][1] && board[1][1] === board[2][0]))){
            setWon(true);
            setShowPopUp(true);
        }

        //if its full and there is no winner, than its a tie
        if (full) {
            setTie(true);
            setShowPopUp(true);
        }

    }, [board])

    //on click of a div, if it is empty, place the correct letter inside and update the board state

    const boardCells = board.map((row, rowInd) => row.map((cell, cellInd) => <div key={[rowInd, cellInd]} onClick={makeMove} data-row={rowInd} data-col={cellInd} style={cell === "" && !won ? {cursor: "pointer"} : {}} className="ttt--cell">{cell}</div>));
    return (
        <>
            <input type="image" alt="" src={homeIcon} onClick={() => navigate("/")} className="home--button"/>
            <main className="main">
                <h1 className="title">TicTacToe</h1>
                {showPopUp && <PopUp onClose={togglePopUp} winText={tie && !won ? "Tie!" : `Player ${xTurn ? "O" : "X"} Won!`} playAgain={restartGame} won={true} />}
                <div className="ttt--board">
                    {/* mapped div elements of some kind that correspond to the board*/}
                    {boardCells}
                </div>
            </main>
        </>
    );
};

export default TicTacToePage;