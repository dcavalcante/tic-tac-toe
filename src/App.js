import React, { useState, useEffect } from "react";
import { checkWin, checkDraw, findBestMove } from "./utils";
import "./App.css";

export const algorithms = [
  { text: "Human", value: "human" },
  { text: "AI: Random", value: "random" },
  { text: "AI: Minimax", value: "minimaxBetter" },
  { text: "AI: Minimax AB Prunning", value: "minimaxAlphaBeta" },
];

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [algorithm, setAlgorithm] = useState(algorithms[0].value);
  const [playerTurn, setPlayerTurn] = useState("X");

  useEffect(() => {
    const draw = checkDraw(board);
    const won = checkWin(board);
    const isGameOver = won || draw;
    if (isGameOver) {
      won ? setWinner(`The winner is ${isGameOver}`) : setWinner("Game Draw");
    } else {
      if (playerTurn === "O" && algorithm !== "human") {
        makeAIMove();
      }
    }
  }, [board, playerTurn, algorithm]);

  const makeAIMove = () => {
    const aiMove = findBestMove(board, "O", algorithm);
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[aiMove] = "O";
      return newBoard;
    });
    setPlayerTurn("X");
  };

  const handleClick = (index) => {
    if (board[index] === null && !winner) {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[index] = playerTurn;
        return newBoard;
      });
      setPlayerTurn(playerTurn === "X" ? "O" : "X");
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setPlayerTurn("X");
    setWinner(null);
  };

  const handleSelect = (evt) => {
    const { value } = evt.target;
    if (value !== algorithm) {
      setAlgorithm(value);
    }
  };

  return (
    <div className="wrapper">
      <h1>Tic-Tac-Toe</h1>

      <div className="controls">
        <div>
          <label htmlFor="algorithm">Player O: </label>
          <select name="algorithm" onChange={handleSelect}>
            {algorithms.map((option) => (
              <option value={option.value} key={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="board">
        {board.map((square, index) => (
          <div
            className="square"
            key={index}
            onClick={() => handleClick(index)}
          >
            {square}
          </div>
        ))}
      </div>

      <div className="turn">
        <h2>{winner ? winner : `Next player: ${playerTurn}`}</h2>
      </div>
      <button onClick={handleReset}>Reset board</button>
    </div>
  );

};

export default App;
