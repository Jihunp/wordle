import { useState } from "react";

const KeyBoard = () => {
  const [keysPressed, setKeysPressed] = useState([]);

  const keyBoardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  const handlePress = (key) => {
    setKeysPressed([...keysPressed, key])
  };

  return (
    <div className="keyboard">
      {keyBoardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, colIndex) => (
            <div
              key={colIndex}
              className={`key ${keysPressed.includes(key) ? 'active' : ''}`}
              onClick={() => handlePress(key)}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  
}

export default KeyBoard;