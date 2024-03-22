import { useState, useRef, useEffect } from "react";
import "./Board.css";

import { isRowFilled, handleKeyPress } from "./BoardUtils";

const Board = () => {
  const numRows = 6;
  const numCols = 5;
  const range = (n) => [...Array(n).keys()];
  const inputRef = useRef([]);

  const initialBoxLetters = Array(numRows).fill(Array(numCols).fill(""));
  const [boxContents, setBoxContents] = useState(initialBoxLetters);
  const [word, setWord] = useState("");
  //if enter is pressed then the word will be set as the current row's word
  // then it would be checked to see what row it fits into

  useEffect(() => {
    // Focus on the first input box when the component mounts
    if (inputRef.current[0] && inputRef.current[0][0]) {
      inputRef.current[0][0].focus();
    }
  }, []);
  
  // Perform actions when the row is filled and Enter is pressed
  const handleEnter = () => {
    if (isRowFilled(boxContents, numRows)) {
      console.log("COCONUTS")
      console.log("Row is filled");
    } else {
      console.log("Row is not filled");
    }
  }

  // useEffect(() => {
  //   console.log(boxContents);
  // }, [boxContents]);
  console.log(boxContents);
  const handleKeyDown = (e, rowIndex, colIndex) => {
    handleKeyPress(boxContents, setBoxContents, rowIndex, colIndex, inputRef, numCols, e);
    if (e.key === "Enter") {
      handleEnter();
    }
  };

  //create a function that would check if the row is filled
  // if the row is filled then click enter is clickable
  // if enter is clicked then 

  return (
    <div>
      <h1 className="txt-color-black txt-center">Wordle</h1>
      {range(numRows).map((rowIndex) => (
        <div className="flex-container" key={rowIndex}>
          {range(numCols).map((colIndex) => (
            <div
              className="square border-box font-large"
              key={colIndex}
              onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
              ref={(el) => {
                // Create and store a ref for each input box
                if (!inputRef.current[rowIndex]) {
                  inputRef.current[rowIndex] = [];
                }
                inputRef.current[rowIndex][colIndex] = el;
              }}
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
