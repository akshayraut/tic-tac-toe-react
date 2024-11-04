import React from 'react';
import logo from './logo.svg';
import './App.css';
import Block from './components/Block';
import ParticipantsDetails from './components/ParticipantsDetails';
import { useState } from 'react';

function App() {

  

  const[state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const[showMessage, setShowMessage] = useState(false);
  const[winner, setWinner] = useState<{ inputValueX?: string; inputValueO?: string } | null>(null); // Updated type
  const[isDisable, setIsDisable] = useState(true);
  const [inputValueX, setInputValueX] = useState('');
  const [inputValueO, setInputValueO] = useState('');

  const checkWinner = (state: any[]) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for(let i = 0; i < win.length; i++){
      const [a,b,c] = win[i];
      if(state[a] !== null && state[a] == state[b] && state[a] == state[c]) return true;
    }

  }

  const handleBlockClick = (index : number) => {
    const stateCopy = Array.from(state);

    if(stateCopy[index] !== null) return;
    stateCopy[index] = currentTurn;

    //Winner logix
    const win = checkWinner(stateCopy);

    if(win){
      let winnerData = (currentTurn == 'X' ? {inputValueX} : {inputValueO});
      setWinner(winnerData);
      //alert(`Winner is: ${winner}`);
      setShowMessage(true);
      setIsDisable(true);
      setInputValueX('');
      setInputValueO('');
      
    }else{
      setShowMessage(false);
      setIsDisable(false);
    }
    //End Winner Logic
    setCurrentTurn(currentTurn === 'X' ? 'O' : 'X'); 
    setState(stateCopy);
  }

  const handleInputChangeX = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueX(event.target.value);
  };

  const handleInputChangeO = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueO(event.target.value);
  };

  const resetGame = () => {
    setState(Array(9).fill(null));
    setCurrentTurn('X');
    setShowMessage(false);
    setWinner(null);
    setIsDisable(false);
  };

  const handleButtonClick = () => {
    console.log(inputValueX); // Get input value
    console.log(inputValueO);
    if(inputValueX != '' && inputValueO != ''){
      setIsDisable(false);
      
    };
    resetGame();
    
  };
  console.log(state);

  return (
    <>
    <div className="participantsDetails">
      <h4>X - is <input type='text' id="playerX" value={inputValueX} onChange={handleInputChangeX} /> </h4>
      <h4>O - is <input type='text' id="playerO" value={inputValueO} onChange={handleInputChangeO} /> </h4>
      <button onClick={handleButtonClick}  name="start">Start Game</button>
      {showMessage && (
       < ParticipantsDetails value={winner?.inputValueX || winner?.inputValueO} />
      )}
    </div>
    <div className="board" style={{
          opacity: isDisable ? 0.5 : 1,
          pointerEvents: isDisable ? 'none' : 'auto',
          backgroundColor: isDisable ? '#f0f0f0' : '#fff',
          padding: '10px',
          border: '1px solid #ccc',
          marginTop: '10px',
        }}
>
      <div className='row'>
        <Block onClick={() => handleBlockClick(0)} value={state[0]} />
        <Block onClick={() => handleBlockClick(1)} value={state[1]} />
        <Block onClick={() => handleBlockClick(2)} value={state[2]} />
      </div>
      <div className='row'>
        <Block onClick={() => handleBlockClick(3)} value={state[3]} />
        <Block onClick={() => handleBlockClick(4)} value={state[4]} />
        <Block onClick={() => handleBlockClick(5)} value={state[5]} />
      </div>
      <div className='row'>
        <Block onClick={() => handleBlockClick(6)} value={state[6]} />
        <Block onClick={() => handleBlockClick(7)} value={state[7]} />
        <Block onClick={() => handleBlockClick(8)} value={state[8]} />
      </div>
      
    </div>
    </>
  );
}

export default App;
