import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ curPlayer, handleSelect }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleClick(rowIndex, columnIndex) {
    if (gameBoard[rowIndex][columnIndex]) return;

    const newBoard = gameBoard.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === columnIndex ? curPlayer : cell
      )
    );
    setGameBoard(newBoard);
    handleSelect();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((rows, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {rows.map((cell, columnIndex) => (
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
