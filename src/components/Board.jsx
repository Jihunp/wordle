import {useState, useRef, useEffect} from "react";
import "./Board.css";
import {
  isRowFilled,
  handleKeyPress,
  countLetters,
  getRandomWord,
} from "./BoardUtils";

import KeyBoard from "./KeyBoard";

const initialBoxLetters = Array(6).fill(Array(5).fill(""));

const Board = () => {
  const numRows = 6;
  const numCols = 5;
  const inputRef = useRef([]);

  const [boxContents, setBoxContents] = useState(initialBoxLetters);
  const [currentRow, setCurrentRow] = useState(0);
  const [finalizedRow, setFinalizedRow] = useState(Array(numRows).fill(false));
  const [randomWord, setRandomWord] = useState("");
  const [winner, setWinner] = useState(false);
  const [guess, setGuess] = useState([]);

  //getRandom word every time screen is refreshed
  useEffect(() => {
    const word = getRandomWord();
    setRandomWord(word);
  }, []);

  useEffect(() => {
    if (inputRef.current[0] && inputRef.current[0][0]) {
      inputRef.current[0][0].focus();
    }
  }, []);

  //play music 
  useEffect(() => {
    if (winner) {
      const audio = new Audio("../../fulltime.mp3");
      audio.play();
    }
  }, [winner]);



  const handleEnter = (e, rowIndex, colIndex) => {
    if (winner) return;

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
        setGuess((prevGuesses) => [...prevGuesses, currentGuess]);

        isCorrectLetter(currentGuess, randomWord);
        focusNextRow();
      }
    }
  };

  const isCorrectLetter = (currentGuess, randomWord) => {
    const correctGuess = randomWord;
    const correctArray = [...correctGuess];
    const guessArray = [...currentGuess];

    const letterMapCounts = countLetters(correctGuess);

    // Set to store correct positions
    const correctPositions = new Set();

    // Iterate over guessArray to find correct positions and mark them as green
    guessArray.forEach((letter, i) => {
      if (correctArray[i] === letter) {
        correctPositions.add(i);
        inputRef.current[currentRow][i].classList.add("bg-green");
        letterMapCounts[letter]--; // if letter is considered green decrement letter count
      }
    });

    // Iterate over guessArray to mark correct letters in wrong positions as yellow
    guessArray.forEach((letter, i) => {
      if (!correctPositions.has(i) && letterMapCounts[letter] > 0) {
        inputRef.current[currentRow][i].classList.add("bg-yellow");
        letterMapCounts[letter]--; // Reduce letter count
      }
    });
    if (currentGuess === correctGuess) {
      setWinner(true);
    }
  };

  const focusNextRow = () => {
    const nextRow = currentRow + 1;
    if (nextRow < numRows) {
      setCurrentRow(nextRow);
      const nextInput = inputRef.current[nextRow][0];
      if (nextInput) nextInput.focus();
    }
  };
  console.log("the random word is");
  console.log(randomWord);

  return (
    <div>
      <h1 className="font-3vw mx-10 txt-color-black txt-center">Wordle</h1>
      {Array.from({length: numRows}).map((_, rowIndex) => (
        <div className="flex-container" key={rowIndex}>
          {Array.from({length: numCols}).map((_, colIndex) => (
            <div
              className={`square border-box `}
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
      {/* <p>Current Row: {currentRow}</p> */}
      <KeyBoard guess={guess} />
      {winner && 
      <div className="winner-container">
        <div>There is a good thing here</div>
        YOU WON
      </div>
      }
    </div>
  );
};

export default Board;
