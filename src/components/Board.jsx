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
  const [finalizedRow, setFinalizedRow] = useState(Array(numRows).fill(false));
  const [correctLetters, setCorrectLetters] = useState(Array(numCols).fill(false));
  const [guess, setGuess] = useState([]);

  useEffect(() => {
    // Focus on the first input box when the component mounts
    if (inputRef.current[0] && inputRef.current[0][0]) {
      inputRef.current[0][0].focus();
    }
  }, []);



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


        // let correctGuess = GameStats.correctGuess;
        let currentGuess = boxContents[currentRow].join("").toLowerCase();
        // let arrayGuess = boxContents[currentRow].toLowerCase();

        setGuess(currentGuess);
        console.log("this is the guess")
        console.log(currentGuess);

        const isCorrectLetter = (currentGuess) => {
          const correctGuessLetters = GameStats.correctGuess.split('');
          const newCorrectLetters = [...correctLetters]; // Create a copy of correctLetters state
        
          for (let i = 0; i < numCols; i++) {
            if (correctGuessLetters.includes(currentGuess[i])) {
              newCorrectLetters[i] = true; // Mark the correct letter as true
            }
          }
        
          setCorrectLetters(newCorrectLetters); // Update correctLetters state
        };
        isCorrectLetter(currentGuess);

        //need to change this funciton
        // if (isGuessCorrect(currentGuess, correctGuess)) {
        //   setGuess(currentGuess);
        //   console.log(...guess);
        // } else {
        //   isCorrectLetter();
        // }

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
              className={`square border-box font-large
              ${correctLetters[colIndex] && currentRow === rowIndex ? "correct-letter" : ""}`}
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
