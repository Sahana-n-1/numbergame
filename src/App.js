import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NumberInput from './components/NumberInput';
import ResultMessage from './components/ResultMessage';
import Button from './components/Button';
import './App.css';
const App = () => {
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 20) + 1);
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const maxCount = 5;

  useEffect(() => {
    if (count === maxCount) {
      setMessage('You have reached the maximum number of guesses!');
    }
  }, [count]);

  const remainingAttempts = maxCount - count;

  const handleGuess = (value) => {
      if (value.trim() === "") {
        setMessage("Please enter a number.");
        return;
      }

    const guessNum = parseInt(value);
    if (isNaN(guessNum)) {
      setMessage("Please enter a valid number.");
      return;
    }

    setCount(count + 1);
    if (count < maxCount) {
      if (guessNum === secretNumber) {
        setMessage('Congratulations! You guessed it right!');
        document.body.style.backgroundColor = '#00ff00';

      }else if(guessNum< secretNumber) {
        setMessage(`You Guess Too low. Try again!`);
        document.body.style.backgroundColor = '#FFF';
      }
      else{
        setMessage("you guess too high");
        document.body.style.backgroundColor = '#FFF';
      }
    }
  };

  const resetGame = () => {
    setSecretNumber(Math.floor(Math.random() * 20) + 1);
    setMessage('');
    setCount(0);
  };
  return (
    <>
    <Header />
    <div className="container">
      <div className="card">
        <div className="content">
          <NumberInput onSubmit={handleGuess} />
          <ResultMessage message={message} />
          {message === 'Congratulations! You guessed it right!' && ( // Check if user has won
              <Button onClick={resetGame} text="Restart Game" />
          )}
        </div>
        <div className="attempts">
          <p>Remaining attempts: {remainingAttempts}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
