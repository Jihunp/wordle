
import React, { useState } from "react";
import "./Board.css";

const Board = () => {
  const numRows = 1;
  const numCols = 6;

  const range = (n) => [...Array(n).keys()];
  const initialBoxLetters = Array(numRows).fill(Array(numCols).fill(""));

  const [boxContents, setBoxContents] = useState(initialBoxLetters);

  const handleKeyPress = (e, rowIndex, colIndex) => {
    const newBoxLetters = [...boxContents];
    const inputChar = e.key.toUpperCase(); // Convert pressed key to uppercase
    const emptyBoxIndex = newBoxLetters[rowIndex].findIndex(
      (letter) => letter === ""
    );

    // Handle Backspace
    if (inputChar === "BACKSPACE") {
      newBoxLetters[rowIndex][colIndex] = ""; // Clear the letter inside the box
      setBoxContents(newBoxLetters);
      return; // Exit early to prevent further execution
    }

    if (emptyBoxIndex !== -1) {
      newBoxLetters[rowIndex][emptyBoxIndex] = inputChar;
      setBoxContents(newBoxLetters);
    }
  };

  return (
    <div>
      <h1 className="txt-color-black txt-center">Wordle</h1>
      {range(numRows).map((rowIndex) => (
        <div className="flex-container" key={rowIndex}>
          {range(numCols).map((colIndex) => (
            <div
              className="square border-box"
              key={colIndex}
              onKeyDown={(e) => handleKeyPress(e, rowIndex, colIndex)}
              tabIndex={0}
            >
              {boxContents[rowIndex][colIndex]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
