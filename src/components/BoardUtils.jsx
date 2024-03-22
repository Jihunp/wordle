export const isRowFilled = (boxContents, rowIndex) => {
  const isFilled = boxContents[rowIndex].every((char) => char != "");
  return isFilled;
};

export const handleKeyPress = (boxContents, setBoxContents, rowIndex, colIndex, inputRef, numCols, e) => {
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
