import {useEffect, useState} from "react";
import "./KeyBoard.css";

const KeyBoard = ({ guess }) => {
  const [highlightedKeys, setHighlightedKeys] = useState(new Set());

  useEffect(() => {
    // Create a new Set to store the highlighted keys
    const newHighlightedKeys = new Set();
  
    // Loop through each guess in the array
    guess.forEach(guessWord => {
      // Split the guess word into individual letters
      let formattedLetters = guessWord.toUpperCase();
      const letters = formattedLetters.split('');
      
      // Add each letter to the newHighlightedKeys Set
      letters.forEach(letter => {
        newHighlightedKeys.add(letter);
      });
    });
  
    // Update the state with the new Set of highlighted keys
    setHighlightedKeys(newHighlightedKeys);
  }, [guess]);

  const keyBoardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"],
  ];


  return (
    <div className="txt-center mx-top">
      <div className="keyboard font-large">
        {keyBoardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row ">
            {row.map((key, colIndex) => (
              <div 
              key={colIndex} 
              className={`key ${
                highlightedKeys.has(key.toUpperCase()) ? "bg-grey" : ""
              }`}
              >
                {key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyBoard;
