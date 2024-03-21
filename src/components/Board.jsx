import React from "react";
import "./Board.css";

const Board = () => {
  const numRows = 6;
  const numCols = 6;

  const range = (n) => [...Array(n).keys()];

  return (
    <div>
      <h1 className="txt-color-black">Wordle </h1>
      {range(numRows).map((rowIndex) => (
        <div className="flex-container" key={rowIndex}>
          {range(numCols).map((colIndex) => (
            <div className="square border-box" key={colIndex}>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  
}

export default Board;