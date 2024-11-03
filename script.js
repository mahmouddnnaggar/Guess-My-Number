'use strict';

// ^ get html elements
const guessNumberInput = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const highScore = document.querySelector('.highscore');
const displayNumber = document.querySelector('.number');

// ^ Variables
let scoreNumber = setScoreNumber(20);
let highScoreNumber = setHighScore();
let secretNumber = setSecretNumber();
let lastSecretNumber;

// ^ Utility Functions
function setMessage(msg) {
  message.textContent = msg;
}
function setSecretNumber(reset = false, toWhat = 20) {
  if (!reset) return Math.trunc(Math.random() * toWhat) + 1;
  secretNumber = Math.trunc(Math.random() * toWhat) + 1;
}
function setHighScore(reset = false, newScore) {
  if (!reset) return +localStorage.getItem('highScore') || 0;
  if (newScore && newScore > highScoreNumber) {
    localStorage.setItem('highScore', JSON.stringify(newScore));
  }
  highScoreNumber = +localStorage.getItem('highScore') || 0;
  highScore.textContent = highScoreNumber;
}
function setScoreNumber(number) {
  if (number) {
    score.textContent = number;
    return number;
  } else {
    scoreNumber--;
    score.textContent = scoreNumber;
  }
}

// ^ Main functions
function reset() {
  setSecretNumber(true);
  while (secretNumber === +localStorage.getItem('lastSecretNumber')) {
    setSecretNumber(true);
  }
  setHighScore(true);
  setMessage('Start guessing...');
  scoreNumber = setScoreNumber(20);
  displayNumber.textContent = '?';
  checkBtn.disabled = false;
  guessNumberInput.value = '';
  document.body.style.backgroundColor = '#222';
  displayNumber.style.width = '15rem';
}
function tryGuess() {
  const success = () => {
    document.body.style.backgroundColor = '#117554';
    setMessage('🎉 Success');
    displayNumber.style.width = '30rem';
    displayNumber.textContent = secretNumber;
    // ^ high score update
    setHighScore(true, scoreNumber);
    // ^ save last secret number
    localStorage.setItem('lastSecretNumber', guessNumberInput.value);
  };
  const failure = () => {
    setScoreNumber();
    if (scoreNumber === 0) {
      setMessage('💥 Game Over');
      document.body.style.backgroundColor = '#D10363';
      checkBtn.disabled = true;
    } else {
      setMessage(guessNumber > secretNumber ? '📈 Too High!' : '📉 Too Low');
    }
  };
  const guessNumber = Number(guessNumberInput.value);
  if (guessNumber) {
    if (guessNumber === secretNumber) {
      success();
    } else {
      failure();
    }
  } else {
    setMessage('🔢 Enter A Number!');
  }
}
function guessInputHandler() {
  if (this.value < 0) this.value = '';
}

// ^ initial game
reset();

// ^ event listeners
guessNumberInput.addEventListener('input', guessInputHandler);
checkBtn.addEventListener('click', tryGuess);
againBtn.addEventListener('click', reset);
