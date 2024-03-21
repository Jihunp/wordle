import { useState } from "react";
import "./KeyBoard.css"

const KeyBoard = () => {
  const [keysPressed, setKeysPressed] = useState([]);

  const keyBoardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Delete']
  ];
  const handlePress = (key) => {
    setKeysPressed([...keysPressed, key])
  };

  return (
    <div className="txt-center mx-top">
      <div className="keyboard font-large">
        {keyBoardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row ">
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
    </div>
  );
  
}

export default KeyBoard;