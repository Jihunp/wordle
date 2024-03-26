import Confetti from 'react-confetti';
import './Celebration.css'; 

const Celebration = () => {
  return (
    <div className='celebration-container'>
      <div >
        <h1>Congragulations you have won!</h1>
        <h1>To play again please refresh your page</h1>
      </div>
      <Confetti />
    </div>
  );
};

export default Celebration;
