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
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let scoreNumber = 20;
let highScoreNumber = +localStorage.getItem('highScore') || 0;

// ^ functions
function reset() {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  highScoreNumber = +localStorage.getItem('highScore') || 0;
  highScore.textContent = highScoreNumber;
  scoreNumber = 20;
  score.textContent = scoreNumber;
  displayNumber.textContent = '?';
  message.textContent = 'Start guessing...';
  checkBtn.disabled = false;
  guessNumberInput.value = '';
  document.body.style.backgroundColor = '#222';
  displayNumber.style.width = '15rem';
}
function tryGuess() {
  const success = () => {
    document.body.style.backgroundColor = '#117554';
    message.textContent = '🎉 Success';
    // guessNumberInput.value = '';
    displayNumber.style.width = '30rem';
    displayNumber.textContent = secretNumber;
    // ^ high score update
    if (scoreNumber > highScoreNumber) highScoreNumber = scoreNumber;
    highScore.textContent = highScoreNumber;
    localStorage.setItem('highScore', JSON.stringify(highScoreNumber));
  };
  const failure = () => {
    scoreNumber--;
    score.textContent = scoreNumber;
    if (scoreNumber === 0) {
      message.textContent = '💥 Game Over';
      document.body.style.backgroundColor = '#D10363';
      checkBtn.disabled = true;
    } else {
      message.textContent =
        guessNumber > secretNumber ? '📈 Too High!' : '📉 Too Low';
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
    message.textContent = '🔢 Enter A Number!';
  }
}

// ^ initial game
reset();

// ^ event listeners
checkBtn.addEventListener('click', tryGuess);
againBtn.addEventListener('click', reset);
