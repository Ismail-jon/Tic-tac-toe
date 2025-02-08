import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X");

  function handleSelect() {
    setCurrentPlayer((activPlayer) => activPlayer === "X" ? "O" : "X");
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={currentPlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={currentPlayer === "O"} />
        </ol>
        <GameBoard curPlayer={currentPlayer} handleSelect={handleSelect} />
      </div>
    </main>
  );
}

export default App;
