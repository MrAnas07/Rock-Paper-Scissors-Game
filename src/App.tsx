import React from 'react';
import './App.css';
import RockPaperScissorsGame from './components/RockPaperScissorsGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rock Paper Scissors Game</h1>
        <RockPaperScissorsGame />
      </header>
    </div>
  );
}

export default App;