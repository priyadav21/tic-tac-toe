const GameOver = ({ winner, resetGame }) => {
    return (<div id='game-over'>
        <h2>Game Over!</h2>
        <p>{winner ? `${winner} won!` : "It's a draw!"}</p>
        <p><button onClick={resetGame}>Rematch</button></p>
    </div>);
}

export default GameOver;