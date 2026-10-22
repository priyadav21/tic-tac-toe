import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './winning-combinations';

const DEFAULT_PLAYER_NAMES = {
  X: 'Player 1',
  O: 'Player 2'
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function getActivePlayer(gameTurns) {
  let currPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currPlayer = 'O';
  }

  return currPlayer;
}

function getWinner(gameBoard, playersName) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = playersName[firstSquareSymbol];
    }
  }

  return winner
}

function getGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [playersName, setPlayersName] = useState(DEFAULT_PLAYER_NAMES);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = getActivePlayer(gameTurns);
  const gameBoard = getGameBoard(gameTurns);
  const winner = getWinner(gameBoard, playersName);
  const hasDraw = gameTurns.length === 9 && !winner;


  function handlePlayerNameChange(symbol, newName) {
    setPlayersName((prevNames) => {
      return { ...prevNames, [symbol]: newName }
    });
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currPlayer = getActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurns
      ]
      return updatedTurns;

    })
  }

  function resetGame() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={DEFAULT_PLAYER_NAMES.X} symbol="X" isActive={activePlayer === 'X'} saveName={handlePlayerNameChange} />
          <Player initialName={DEFAULT_PLAYER_NAMES.O} symbol="O" isActive={activePlayer === 'O'} saveName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} resetGame={resetGame} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main >
  )
}

export default App
