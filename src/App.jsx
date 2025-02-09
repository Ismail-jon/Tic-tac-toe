import { useState } from 'react';

// Importing components
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

// Define player names mapped to their symbols
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  // If the latest move was made by 'X', switch to 'O'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

/**
 * Generates the current state of the game board based on the recorded turns.
 */
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  // Apply each turn to the copied board
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player; // Place the player's symbol at the corresponding position
  }

  return gameBoard;
}

/**
 * Determines if there is a winner by checking the game board against winning combinations.
 */
function deriveWinner(gameBoard, players) {
  let winner; // Stores the name of the winning player (if any)

  // Loop through all predefined winning combinations
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    // Check if all three positions contain the same symbol (either 'X' or 'O')
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]; 
    }
  }

  return winner; // Returns the winner or undefined if no one has won yet
}

/**
 * Main Tic-Tac-Toe App component
 */
function App() {
  const [players, setPlayers] = useState(PLAYERS); // Manage player names
  const [gameTurns, setGameTurns] = useState([]); // Store game moves

  // Derived state values
  const activePlayer = deriveActivePlayer(gameTurns); // Determine current player
  const gameBoard = deriveGameBoard(gameTurns); // Compute the game board state
  const winner = deriveWinner(gameBoard, players); // Check if there is a winner
  const hasDraw = gameTurns.length === 9 && !winner; // Check for a draw

  /**
   * Handles selecting a square on the game board.
   * Adds the move to the gameTurns state.
   */
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns); // Determine which player is making the move

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns, // Store the new turn at the beginning of the array
      ];

      return updatedTurns;
    });
  }


  function handleRestart() {
    setGameTurns([]); // Reset game
  }


  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers, 
        [symbol]: newName 
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {/* Show GameOver screen if there is a winner or a draw */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />

      </div>
      
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
