import  React, {useState } from 'react';

// TODO:
// 1. For the current move only, show “You are at move #…” instead of a button.
// 2. Rewrite Board to use two loops to make the squares instead of hardcoding them.
// 3. Add a toggle button that lets you sort the moves in either ascending or descending order.
// 4. When someone wins, highlight the three squares that caused the win (and when no one wins, display a  
//    message about the result being a draw).
// 5. Display the location for each move in the format (row, col) in the move history list.


function Square({ value, onSquareClick}) {
  return <button onClick={onSquareClick} className="square">{value}</button>;
}

function Board({ xIsNext, squares, onPlay }) {
  // Handle click is able to update squares and set Squares because both are defined in the same function.
  // Note variable is binded to the div Square by passing squares[i]

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
    if (xIsNext) {
      nextSquares[index] = "X";

    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);
    // Calling the setSquares function lets React know the state of the component has changed. This will trigger a re-render of the components that use the squares state (Board) as well as its child components (the Square components that make up the board).
    // This updates every child, not just the updated value one.
    // Don't actively try to avoid rendering something. Immutability makes this complete rendering operation smooth n fast.
    // setSquares(nextSquares);
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
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // only keep history till the point the user has set currentmove to. and then add the new moves after that.
     const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    // map each element in the history, as list of all squares and Index to a button.
    // User can click and load that state.
    // As react can't differentiate between newly creaed li values. It needs some id to perform distinction.
    // Error: Each child in a list should have a unique "key" prop.
    //<li key={user.id}>
    //   {user.name}: {user.taskCount} tasks left
    // </li>
    // When a list is re-rendered, React takes each list item’s key and searches the previous list’s items for a matching key. If the current list has a key that didn’t exist before, React creates a component. If the current list is missing a key that existed in the previous list, React destroys the previous component. If two keys match, the corresponding component is moved.
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
