import { useState, useRef, useEffect } from "react";
import "./Board.css";

const Board = () => {
  const numRows = 6;
  const numCols = 5;
  const range = (n) => [...Array(n).keys()];
  const inputRef = useRef([]);

  const initialBoxLetters = Array(numRows).fill(Array(numCols).fill(""));
  const [boxContents, setBoxContents] = useState(initialBoxLetters);

  useEffect(() => {
    // Focus on the first input box when the component mounts
    if (inputRef.current[0] && inputRef.current[0][0]) {
      inputRef.current[0][0].focus();
    }
  }, []);
  
  //create a function that would check if the row is filled
  // if the row is filled then click enter is clickable
  // if enter is clicked then 


  const handleKeyPress = (e, rowIndex, colIndex) => {
    const newBoxLetters = JSON.parse(JSON.stringify(boxContents));
    const inputChar = e.key.toUpperCase();


    // Handle Backspace
    if (inputChar === "BACKSPACE") {
      newBoxLetters[rowIndex][colIndex] = ""; // Clear the letter inside the box
      setBoxContents(newBoxLetters);
      const prevInput = inputRef.current[rowIndex][colIndex - 1];
      if (prevInput) prevInput.focus();
    }

    // Check if input is a letter
    if (/^[a-zA-Z]$/.test(inputChar)) {
      newBoxLetters[rowIndex][colIndex] = inputChar;
      setBoxContents(newBoxLetters);

      // Move focus of the box forward
      if (colIndex < numCols - 1) {
        const nextInput = inputRef.current[rowIndex][colIndex + 1];
        if (nextInput) nextInput.focus();
      }
    }

  };

  return (
    <div>
      <h1 className="txt-color-black txt-center">Wordle</h1>
      {range(numRows).map((rowIndex) => (
        <div className="flex-container" key={rowIndex}>
          {range(numCols).map((colIndex) => (
            <div
              className="square border-box font-large"
              key={colIndex}
              onKeyDown={(e) => handleKeyPress(e, rowIndex, colIndex)}
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
