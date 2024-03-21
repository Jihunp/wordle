import { useState } from "react";

const TestCounter = () => {
  const [count, setCount] = useState(0);
  const numArr = [1, 2, 3, 4, 5];

  const handleClick = () => {
    setCount(count + 1);
  }

  return (
    <div style={{fontSize: "100px", color: "black"}}>
      <button onClick={handleClick}>
        click me
      </button>
      <p>Display Count: {count}</p>
      <h1>{numArr}</h1>
    </div>
  );
}

export default TestCounter