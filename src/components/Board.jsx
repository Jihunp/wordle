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
  // const [correctLetters, setCorrectLetters] = useState(
  //   Array(numCols).fill(false)
  // );
  const [correctLetters, setCorrectLetters] = useState(
    Array(numRows).fill(Array(numCols).fill(false))
  );
  const [className, setClassName] = useState("initial-class");

    useEffect(() => {
      // Focus on the first input box when the component mounts
      if (inputRef.current[0] && inputRef.current[0][0]) {
        inputRef.current[0][0].focus();
      }
    }, []);

  const changeClassName = () => {
    setClassName("correct-letter");
    // if the 
  };

  const isCorrectLetter = (boxContents, currentGuess, currentRow, correctGuess) => {
    //get the guess 
    console.log("correct guess estimate in correctLEtte function");
    console.log(correctGuess);

    const correctGuessLetters = GameStats.correctGuess.split("");
    let foundCorrectLetter = false;
    const newCorrectLetters = [...correctLetters]; // Create a copy of correctLetters state

    for (let i = 0; i < numCols; i++) {
      if (correctGuessLetters.includes(currentGuess[i])) {
        newCorrectLetters[currentRow][i] = true; // Mark the correct letter as true
        foundCorrectLetter = true;
      }
      if (foundCorrectLetter) {
        inputRef.current[currentRow][i].classList.add("correct-letter");
      }
    }
    setCorrectLetters(newCorrectLetters); // Update correctLetters state
  };


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
    //if the key pressed was enter
    if (e.key === "Enter") {
      if (isRowFilled(boxContents, currentRow)) {
        const newFinalizedWord = [...finalizedRow];
        newFinalizedWord[currentRow] = true;
        setFinalizedRow(newFinalizedWord);

        const savedGuess = boxContents[currentRow];
        let currentGuess = savedGuess.join("").toLowerCase();

        isCorrectLetter(boxContents, currentGuess, currentRow, GameStats.correctGuess);

        // change focus to the next row
        const nextRow = currentRow + 1;
        if (currentRow < numRows) {
          setCurrentRow(nextRow);
          const nextInput = inputRef.current[nextRow][0];
          if (nextInput) nextInput.focus();
        }
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
              ${className}`}
              key={colIndex}
              onKeyDown={
                (e) =>  {
                  // changeClassName();
                  handleKeyDown(e, rowIndex, colIndex)
                }
              }
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
