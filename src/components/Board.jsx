import {useState, useRef, useEffect} from "react";
import "./Board.css";
import {isRowFilled, handleKeyPress, isGuessCorrect} from "./BoardUtils";

const GameStats = {
  guess: "",
  correctGuess: "hello",
};

const Board = () => {
  const numRows = 6;
  const numCols = 5;
  const range = (n) => [...Array(n).keys()];
  const inputRef = useRef([]);

  const initialBoxLetters = Array(numRows).fill(Array(numCols).fill(""));
  const [boxContents, setBoxContents] = useState(initialBoxLetters);
  const [currentRow, setCurrentRow] = useState(0);
  const [finalizedRow, setFinalizedRow] = useState(Array(numRows).fill(false))

  useEffect(() => {
    // Focus on the first input box when the component mounts
    if (inputRef.current[0] && inputRef.current[0][0]) {
      inputRef.current[0][0].focus();
    }
  }, []);

  //take in the guess array
  // const correctLetterPosition = (boxContents, GameStats.correctGuess) => {
  //   //check every letter in correct guess
  //   //check every letter in boxContents[currentRow]
  //   //if the letter of the gamestats and letter of boxContents are a match
  //   // then turn the letter color green and otherwise turn it 

  //   // also have to add functionality. if a word is entered then the row state is
  //   // saved and cannot be removed.. maybe work on that first
  //   if(boxContents[currentRow])

  // };

  // const correctLetterWrongPositionr = () => {
    
  // };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    handleKeyPress(
      boxContents,
      setBoxContents,
      rowIndex,
      colIndex,
      inputRef,
      numCols,
      e,
      finalizedRow

    );
    if (e.key === "Enter") {
      //if row was filled then it would activate a guess
      if (isRowFilled(boxContents, currentRow)) {
        const newFinalizedWord = [...finalizedRow];
        newFinalizedWord[currentRow] = true;
        setFinalizedRow(newFinalizedWord);
        
        // foxus to the next row
        const nextRow = currentRow + 1;
        if(currentRow < numRows) {
          setCurrentRow(nextRow);
          const nextInput = inputRef.current[nextRow][0];
          if(nextInput) nextInput.focus();
        }

        //
        let currentGuess = "";
        currentGuess = boxContents[currentRow].join("").toLowerCase();

        // setBoxContents[cu]

        // if enter is pressed setBoxcontents[currentRow] as the state
        // make that state unchangeable.

        // if guess is correct setBox contents[currentRow]
        // 

        // if guess is correct then it changes the boxes with the letters to green
        //if the guesss is correct then it does an action
        // if row is filled and enter is pressed then the board will save the guess
        // as a state called guess on the row line. 
        // mostlikely using state
        if (isGuessCorrect(currentGuess, GameStats)) {
          console.log(currentGuess);
        }

        console.log(GameStats);
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
              className={`square border-box font-large ${
                finalizedRow[rowIndex] ? "finalized" : ""
              }`}
              key={colIndex}
              onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
              ref={(el) => {
                // Create and store a ref for each input box
                if (!inputRef.current[rowIndex]) {
                  inputRef.current[rowIndex] = [];
                }
                inputRef.current[rowIndex][colIndex] = el;
              }}
              tabIndex={0}>
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
