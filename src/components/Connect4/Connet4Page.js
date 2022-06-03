import React from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../../images/Home-icon.png";
import PopUp from "../PopUp";

function Connect4Page() {
    let navigate = useNavigate();

    const [board, setBoard] = React.useState([["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""]]);
    const [lastMove, setLastMove] = React.useState({row: -1, col: -1, player: ""});
    const [redTurn, setRedTurn] = React.useState(true);
    const [won, setWon] = React.useState(false);
    const [tie, setTie] = React.useState(false);
    const [showPopUp, setShowPopUp] = React.useState(false);

    function makeMove(event) {
        if (!won && !tie){
            const col = parseInt(event.currentTarget.dataset.id); //get the column of the arrow thats been clicked
            if (board[0][col] !== ""){ //invalid move if column is full
                alert("Invalid Move")
            }else{
                //put correct colour in correct spot
                setBoard(prev => {
                    let newArr = prev.map(row => row.slice());
                    for (let i = 5; i > -1; i--){
                        if (newArr[i][col] === ""){
                            newArr[i][col] = redTurn ? 'r' : 'y';  //if its red turn put down an 'r' otherwise a yellow
                            setLastMove({row: i, col: col, player: redTurn ? 'r' : 'y'}) //set what the last move was so we can check for 4 in a row
                            break;
                        }
                    }
                    return newArr;
                });
                setRedTurn(prev => !prev);
            }
        }
    };

    //need to use callback functions for our checks as they are functions used within the useEffect hook. Pass them the parameters directly as then they wont depend on state
    const checkHorizonal = React.useCallback((board, lm) => {
        const { row: x, col: y, player: colour } = lm;
        let count = 1; //amount of the colour we have
        let ind = y + 1;
        while (count < 4 && ind < 7){ //keep going right unless 4 in a row or ind surpasses the boundary
            if (board[x][ind] !== colour) break;
            count++;
            ind++;
        }

        ind = y - 1;
        while (count < 4 && ind > -1){ //keep going left unless 4 in a row or ind surpasses the boundary
            if (board[x][ind] !== colour) break;
            count++;
            ind--;
        }

        return count >= 4; //return whether we have a win or not
    }, []);

    const checkVertical = React.useCallback((board, lm) => {
        const { row: x, col: y, player: colour } = lm;
        let count = 1; //amount of the colour we have
        let ind = x + 1;
        while (count < 4 && ind < 6){ //keep going down unless 4 in a row or ind surpasses the boundary
            if (board[ind][y] !== colour) break;
            count++;
            ind++;
        }

        ind = x - 1;
        while (count < 4 && ind > -1){ //keep going up unless 4 in a row or ind surpasses the boundary
            if (board[ind][y] !== colour) break;
            count++;
            ind--;
        }

        return count >= 4; //return whether we have a win or not
    }, []);

    const checkLeftDiagonal = React.useCallback((board, lm) => {
        const { row: x, col: y, player: colour } = lm;
        let count = 1; //amount of the colour we have
        let xind = x - 1;
        let yind = y - 1;
        while (count < 4 && xind > -1 && yind > -1){ //keep going up left unless 4 in a row or ind surpasses the boundary
            if (board[xind][yind] !== colour) break;
            count++;
            xind--;
            yind--;
        }

        xind = x + 1;
        yind = y + 1;
        while (count < 4 && xind < 6 && yind < 7){ //keep going down right unless 4 in a row or ind surpasses the boundary
            if (board[xind][yind] !== colour) break;
            count++;
            xind++;
            yind++;
        }

        return count >= 4;
    }, []);

    const checkRightDiagonal = React.useCallback((board, lm) => {
        const { row: x, col: y, player: colour } = lm;
        let count = 1; //amount of the colour we have
        let xind = x - 1;
        let yind = y + 1;
        while (count < 4 && xind > -1 && yind < 7){ //keep going up right unless 4 in a row or ind surpasses the boundary
            if (board[xind][yind] !== colour) break;
            count++;
            xind--;
            yind++;
        }

        xind = x + 1;
        yind = y - 1;
        while (count < 4 && xind < 6 && yind > -1){ //keep going down left unless 4 in a row or ind surpasses the boundary
            if (board[xind][yind] !== colour) break;
            count++;
            xind++;
            yind--;
        }

        return count >= 4;
    }, []);

    const boardIsFull = React.useCallback((board) => {
        for (let i = 0; i < 6; i++){
            if (board[i].includes("")) return false;
        }
        return true;
    }, []);

    React.useEffect(() => {
        //make sure a move has been made before checking for win, also check all possible directions from last move placement to check 4 in a row
        if (lastMove.row !== -1 && (checkHorizonal(board, lastMove) || checkVertical(board, lastMove) || checkLeftDiagonal(board, lastMove) || checkRightDiagonal(board, lastMove))){
            setWon(true);
            setShowPopUp(true);
        } else if (boardIsFull(board)){
            setShowPopUp(true);
            setTie(true);
        }
    }, [board, lastMove, checkHorizonal, checkLeftDiagonal, checkRightDiagonal, checkVertical, boardIsFull]);

    function togglePopUp(){
        setShowPopUp(prev => !prev);
    }

    function restartGame(){
        setBoard([["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""]]);
        setLastMove({row: -1, col: -1, player: ""});
        setRedTurn(true);
        setWon(false);
        setTie(false);
        setShowPopUp(false);
    }

    //create the board cell elements based off the actual board
    const boardCells = board.map((row, rowInd) => row.map((cell, cellInd) => {
        return <div 
                key={[rowInd, cellInd]} 
                style={{background: cell === "" ? "white": (cell === 'r' ? "red" : "yellow")}}
                data-row={rowInd} 
                data-col={cellInd} 
                className="c4--cell"
                ></div>}));
    
    //create the selection arrow elements
    const arrows = [];
    for (let i = 0; i < 7; i++){
        arrows.push(<div onClick={makeMove} key={i} data-id={i} className="arrow"></div>)
    }

    return (
        <>
            <input type="image" alt="" src={homeIcon} onClick={() => navigate("/")} className="home--button"/>
            <main className="main">
                <h1 className="title">Connect4</h1>
                {showPopUp && <PopUp onClose={togglePopUp} winText={tie && !won ? "Tie!" : `Player ${redTurn ? "Yellow" : "Red"} Won!`} playAgain={restartGame} won={true} />}
                {/* The arrows to show where to drop */}
                <div className="arrow--container">
                    {arrows}
                </div>
                <div className="c4--board">
                    {/* mapped div elements of some kind that correspond to the board*/}
                    {boardCells}
                </div>
            </main>
        </>
    );
};

export default Connect4Page;