import React, {useState, useRef, useEffect} from "react";
import "./Board.css";
import {isRowFilled, handleKeyPress, countLetters} from "./BoardUtils";

const initialBoxLetters = Array(6).fill(Array(5).fill(""));

const Board = () => {
  const numRows = 6;
  const numCols = 5;
  const inputRef = useRef([]);

  const [boxContents, setBoxContents] = useState(initialBoxLetters);
  const [currentRow, setCurrentRow] = useState(0);
  const [finalizedRow, setFinalizedRow] = useState(Array(numRows).fill(false));

  useEffect(() => {
    if (inputRef.current[0] && inputRef.current[0][0]) {
      inputRef.current[0][0].focus();
    }
  }, []);

  const handleEnter = (e, rowIndex, colIndex) => {
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
      if (isRowFilled(boxContents, currentRow)) {
        const newFinalizedWord = [...finalizedRow];
        newFinalizedWord[currentRow] = true;
        setFinalizedRow(newFinalizedWord);

        const savedGuess = boxContents[currentRow];
        const currentGuess = savedGuess.join("").toLowerCase();

        isCorrectLetter(currentGuess);
        focusNextRow();
      }
    }
  };

  const isCorrectLetter = (currentGuess) => {

    const correctGuess = "hello";
    const correctArray = correctGuess.split("");
    const guessArray = currentGuess.split("");

    const correctPositions = new Set();
    const correctL = [];

    // Count the occurrences of each letter in the correct guess and the current guess
    const correctLetterCounts = countLetters(correctGuess);
    const guessLetterCounts = countLetters(currentGuess);

    // Iterate over each letter in the guess
    guessArray.forEach((letter, i) => {
      if (correctArray[i] === letter) {
        // If the letter is in the correct position, mark it as green
        inputRef.current[currentRow][i].classList.add("bg-green");
        correctPositions.add(i); // Remember correct positions
        correctL.push(letter);
      }

      if (guessLetterCounts[letter] && guessLetterCounts[letter]<= correctLetterCounts[letter]) {
        // If the letter is in the correct word and the count matches, mark it as yellow
        inputRef.current[currentRow][i].classList.add("bg-yellow");
      }
    });
  };

  const focusNextRow = () => {
    const nextRow = currentRow + 1;
    if (nextRow < numRows) {
      setCurrentRow(nextRow);
      const nextInput = inputRef.current[nextRow][0];
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div>
      <h1 className="txt-color-black txt-center">Wordle</h1>
      {Array.from({length: numRows}).map((_, rowIndex) => (
        <div className="flex-container" key={rowIndex}>
          {Array.from({length: numCols}).map((_, colIndex) => (
            <div
              className="square border-box font-large"
              key={colIndex}
              onKeyDown={(e) => handleEnter(e, rowIndex, colIndex)}
              ref={(el) => {
                inputRef.current[rowIndex] ||= [];
                inputRef.current[rowIndex][colIndex] = el;
              }}
              tabIndex={0}>
              {boxContents[rowIndex][colIndex]}
            </div>
          ))}
        </div>
      ))}
      <p>Current Row: {currentRow}</p>
    </div>
  );
};

export default Board;
