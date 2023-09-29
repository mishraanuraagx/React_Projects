import  React, {useState } from 'react';

function Square({ value, onSquareClick}) {
  return <button onClick={onSquareClick} className="square">{value}</button>;
}

function Board() {
  // Handle click is able to update squares and set Squares because both are defined in the same function.
  // Note variable is binded to the div Square by passing squares[i]
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // this will be called everytime the variables are updated and the react starts rendering.
  // It not only renders the square and div but this entire function gets called.
  // so the the following code, even though its outside of the handleclick event, gets called indirectly when react the rendering the board because its variables are updated.

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    // immutability is important 
    // slice makes a copy, we update the copy of values first then update the actual array.
    // this allows complex operation and undo-redo of the entire state easier. Going back in history is easier if the undesired are needed to be removed.
    const nextSquares = squares.slice();
    if (xIsNext == true) {
      nextSquares[index] = "X";
      setXIsNext(!xIsNext);

    } else {
      nextSquares[index] = "O";
      setXIsNext(!xIsNext);
    }
    
    if (nextSquares[0] == nextSquares[1] && nextSquares[1] == nextSquares == [2]) {
      status = "WON!!!"
    }
    // Calling the setSquares function lets React know the state of the component has changed. This will trigger a re-render of the components that use the squares state (Board) as well as its child components (the Square components that make up the board).
    // This updates every child, not just the updated value one.
    // Don't actively try to avoid rendering something. Immutability makes this complete rendering operation smooth n fast.
    setSquares(nextSquares);
  }
  // onSquareClick={handleClick(0) won't work, because this means calling right away the click event and then assigning it to the square. Stuck in infinite loop.
  return (
    <div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
      <div >
        {status}
      </div>
    </div>
  );
}

function calculateWinner(sqaures) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (sqaures[a] && sqaures[a] === sqaures[b] && sqaures[b] === sqaures[c]) {
      return sqaures[a];
    }
  }
  return null;
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
