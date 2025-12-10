import React, { useState } from 'react';
import './RockPaperScissorsGame.css';

type Choice = 'rock' | 'paper' | 'scissors' | null;
type Result = 'win' | 'lose' | 'draw' | null;

const RockPaperScissorsGame: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);
  const [score, setScore] = useState({ player: 0, computer: 0, draws: 0 });
  const [gameHistory, setGameHistory] = useState<Array<{player: Choice, computer: Choice, result: Result}>>([]);

  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const getRandomChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  const getResult = (player: Choice, computer: Choice): Result => {
    if (!player || !computer) return null;

    if (player === computer) return 'draw';

    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }

    return 'lose';
  };

  const handlePlay = (choice: Choice) => {
    const compChoice = getRandomChoice();
    setPlayerChoice(choice);
    setComputerChoice(compChoice);

    const gameResult = getResult(choice, compChoice);
    setResult(gameResult);

    // Update score
    if (gameResult === 'win') {
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (gameResult === 'lose') {
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    } else if (gameResult === 'draw') {
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    }

    // Add to game history
    setGameHistory(prev => [...prev, { player: choice, computer: compChoice, result: gameResult }]);
  };

  const handleResetRound = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  const handleResetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0, draws: 0 });
    setGameHistory([]);
  };

  const getChoiceEmoji = (choice: Choice): string => {
    switch (choice) {
      case 'rock': return '🪨';
      case 'paper': return '📄';
      case 'scissors': return '✂️';
      default: return '';
    }
  };

  return (
    <div className="game-container">
      <div className="scoreboard">
        <div className="score">Player: {score.player}</div>
        <div className="score">Computer: {score.computer}</div>
        <div className="score">Draws: {score.draws}</div>
      </div>

      <div className="choices-container">
        <h2>Choose your weapon:</h2>
        <div className="choices-buttons">
          <button
            className="choice-btn rock-btn"
            onClick={() => handlePlay('rock')}
            disabled={playerChoice !== null}
          >
            <span className="choice-emoji">🪨</span>
            <span>Rock</span>
          </button>
          <button
            className="choice-btn paper-btn"
            onClick={() => handlePlay('paper')}
            disabled={playerChoice !== null}
          >
            <span className="choice-emoji">📄</span>
            <span>Paper</span>
          </button>
          <button
            className="choice-btn scissors-btn"
            onClick={() => handlePlay('scissors')}
            disabled={playerChoice !== null}
          >
            <span className="choice-emoji">✂️</span>
            <span>Scissors</span>
          </button>
        </div>
      </div>

      {(playerChoice || computerChoice) && (
        <div className="result-container">
          <div className="choices-display">
            <div className="player-choice">
              <h3>Your Choice</h3>
              <div className="choice-visual">{getChoiceEmoji(playerChoice)}</div>
              <p>{playerChoice?.toUpperCase()}</p>
            </div>

            <div className="versus">VS</div>

            <div className="computer-choice">
              <h3>Computer's Choice</h3>
              <div className="choice-visual">{getChoiceEmoji(computerChoice)}</div>
              <p>{computerChoice?.toUpperCase()}</p>
            </div>
          </div>

          <div className={`result ${result}`}>
            <h3>
              {result === 'win' && 'You Win! 🎉'}
              {result === 'lose' && 'Computer Wins! 🤖'}
              {result === 'draw' && "It's a Draw! 🤝"}
            </h3>
          </div>

          <div className="action-buttons">
            <button className="action-btn play-again-btn" onClick={handleResetRound}>
              Play Again
            </button>
            <button className="action-btn reset-btn" onClick={handleResetGame}>
              Reset Game
            </button>
          </div>
        </div>
      )}

      {!playerChoice && !computerChoice && (
        <div className="instructions">
          <p>Select Rock, Paper, or Scissors to play against the computer!</p>
          {gameHistory.length > 0 && (
            <div className="game-summary">
              <p>Total Games Played: {gameHistory.length}</p>
              <p>Overall Win Rate: {score.player + score.draws > 0 ? Math.round((score.player / (score.player + score.computer + score.draws)) * 100) : 0}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RockPaperScissorsGame;