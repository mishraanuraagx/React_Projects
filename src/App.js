import React from 'react';

function Square({value}) {
  return <button className="square">{value}</button>;
}

function Row() {
  return (
    <div className='board-row'>
      <Square/>
      <Square/>
      <Square/>
    </div>
  )
}
export default function Board() {
  return (
    <div>
      <Row/>
      <Row/>
      <Row/>
    </div>
  );
}
