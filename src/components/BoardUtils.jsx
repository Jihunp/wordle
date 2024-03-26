import db from "../assets/db"

export const isRowFilled = (boxContents, rowIndex) => {
  const isFilled = boxContents[rowIndex].every((char) => char != "");
  return isFilled;
};


export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * db.length);
  return db[randomIndex];
};

export const isGuessCorrect = (currentGuess, correctGuess) => {
  if (currentGuess === correctGuess) {
    console.log("THIS IS CORRECT");
  }
  return true;
};

export const countLetters = (word) => {
  const letterCounts = new Map();

  for (const letter of word.toLowerCase()) {
    if (/[a-z]/.test(letter)) {
      letterCounts.set(letter, (letterCounts.get(letter) || 0) + 1);
    }
  }

  return Object.fromEntries(letterCounts);
};

export const handleKeyPress = (
  boxContents,
  setBoxContents,
  rowIndex,
  colIndex,
  inputRef,
  numCols,
  e,
  finalizedRow
) => {
  const newBoxLetters = JSON.parse(JSON.stringify(boxContents));
  const inputChar = e.key.toUpperCase();

  // Check if the row is finalized
  if (finalizedRow[rowIndex]) {
    // If the row is finalized, prevent any changes
    e.preventDefault();
    return;
  }

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
