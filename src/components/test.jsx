import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  function handleClick(rowIndex, columnIndex) {
    // If the clicked cell is already filled, don't do anything
    if (gameBoard[rowIndex][columnIndex]) return;

    const newBoard = gameBoard.map((row, rIdx) => 
      row.map((cell, cIdx) => 
        rIdx === rowIndex && cIdx === columnIndex ? currentPlayer : cell
      )
    );

    setGameBoard(newBoard);

    // Switch player turn
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((cell, columnIndex) => (
              <li key={columnIndex}>
                <button onClick={() => handleClick(rowIndex, columnIndex)}>
                  {cell}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
