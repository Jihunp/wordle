import React, { useState, useRef, useEffect } from "react";
import "./Board.css";
import { isRowFilled, handleKeyPress } from "./BoardUtils";

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
    const wrongPositions = new Set();
    const temp = [];
  
    // Find correct letters in the right position
    guessArray.forEach((letter, i) => {
      if (correctArray[i] === letter) {
        correctPositions.add(i);
      }
    });
  
    // Find correct letters in wrong positions
    guessArray.forEach((letter, i) => {
      if (!correctPositions.has(i) && correctArray.includes(letter)) {
        wrongPositions.add(i);
        temp.push(i);
        console.log(...temp);
      }
    });
  
    // Update boxContents and visuals
    // const updatedBoxContents = [...boxContents];
    guessArray.forEach((letter, i) => {
      if (correctPositions.has(i)) {
        // updatedBoxContents[currentRow][i] = letter.toUpperCase();
        inputRef.current[currentRow][i].classList.add("bg-green");
      } else if (wrongPositions.has(i)) {
        //and the number of letters
        inputRef.current[currentRow][i].classList.add("bg-yellow");
      }
    });
    // setBoxContents(updatedBoxContents);
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
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div className="flex-container" key={rowIndex}>
          {Array.from({ length: numCols }).map((_, colIndex) => (
            <div
              className="square border-box font-large"
              key={colIndex}
              onKeyDown={(e) => handleEnter(e, rowIndex, colIndex)}
              ref={(el) => {
                inputRef.current[rowIndex] ||= [];
                inputRef.current[rowIndex][colIndex] = el;
              }}
              tabIndex={0}
            >
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
