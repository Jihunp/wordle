import { useState, useRef, useEffect } from "react";
import "./Board.css";
import { isRowFilled, handleKeyPress, isGuessCorrect } from "./BoardUtils";

const GameStats = {
  guess: "",
  correctGuess: "hello",
}


const Board = () => {
  const numRows = 6;
  const numCols = 5;
  const range = (n) => [...Array(n).keys()];
  const inputRef = useRef([]);

  const initialBoxLetters = Array(numRows).fill(Array(numCols).fill(""));
  const [boxContents, setBoxContents] = useState(initialBoxLetters);
  const [currentRow, setCurrentRow] = useState(0);

  useEffect(() => {
    // Focus on the first input box when the component mounts
    if (inputRef.current[0] && inputRef.current[0][0]) {
      inputRef.current[0][0].focus();
    }
  }, []);


  const handleKeyDown = (e, rowIndex, colIndex) => {
    handleKeyPress(boxContents, setBoxContents, rowIndex, colIndex, inputRef, numCols, e);
    if (e.key === "Enter") {
      //if row was filled then it would activate a guess
      if(isRowFilled(boxContents, currentRow)) {
        setCurrentRow((prevRow) => prevRow + 1);

        //api call
        let currentGuess = "";
        currentGuess = boxContents[currentRow].join('').toLowerCase();

        // if guess is correct then it changes the boxes with the letters to green
        //if the guesss is correct then it does an action
        if(isGuessCorrect(currentGuess, GameStats)) {
          console.log(currentGuess)
        }


        console.log(GameStats)
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
      <p>Current Row: {currentRow}</p> {/* Display the current row */}
    </div>
  );
};

export default Board;
