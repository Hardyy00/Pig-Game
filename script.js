'use script';

// Selecting Elements
const score1Ele = document.getElementById('player-1-score');
const score2Ele = document.getElementById('player-2-score'); // we can select an id by using document.getElementById() is faster
const diceImage = document.querySelector('.dice');
const generateNumber = () => Math.trunc(Math.random() * 6) + 1;
const rollBtn = document.querySelector('.roll-btn');
const holdBtn = document.querySelector('.hold-btn');
const newBtn = document.querySelector('.new-btn');
const p1CurrentScore = document.getElementById('current-1');
const p2CurrentScore = document.getElementById('current-2');
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');

const changePlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  player1.classList.toggle('active-player');
  player2.classList.toggle('active-player'); // .toggle of classList will add the class if it was not there or will remove the class if it was there

  activePlayer = activePlayer == 1 ? 2 : 1;
};

// starting condition
score1Ele.textContent = 0;
score2Ele.textContent = 0; // type coersion will take place
diceImage.classList.add('hidden'); // no need for '.'

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 1;
let isPlaying = true;

// rolling dice functionality
rollBtn.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Generating a random dice roll
    const diceRoll = generateNumber();
    console.log(diceRoll);

    // 2. Displaying dice
    diceImage.classList.remove('hidden');
    diceImage.src = `images/dice-${diceRoll}.png`;

    // 3. Check for rolled 1 : if true, switch to next player
    if (diceRoll != 1) {
      // add the dice roll to current score
      currentScore += diceRoll;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      //  switch to next Player
      scores[activePlayer - 1] += currentScore;

      document.getElementById(`player-${activePlayer}-score`).textContent =
        scores[activePlayer - 1];

      changePlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (isPlaying) {
    // 1 . Add Current score to active player's score
    scores[activePlayer - 1] += currentScore;
    document.getElementById(`player-${activePlayer}-score`).textContent =
      scores[activePlayer - 1];

    // 2. Check if player's score is >= 100

    if (scores[activePlayer - 1] >= 100) {
      isPlaying = false;
      diceImage.classList.add('hidden');
      console.log(`Is Playing : ${isPlaying}`);
      // Finish the game
      document.getElementById(`current-${activePlayer}`).textContent = 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active-player');
    } else {
      // switch to the next player
      changePlayer();
    }
  }
});

newBtn.addEventListener('click', function () {
  p1CurrentScore.textContent = 0;
  p2CurrentScore.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  score1Ele.textContent = 0;
  score2Ele.textContent = 0;
  diceImage.classList.add('hidden');

  document.querySelector(`.player--${activePlayer}`).classList.remove('winner');

  // you can use .remove() even if there is no class that is specified

  if (activePlayer == 2) {
    player2.classList.remove('active-player');
  }

  player1.classList.add('active-player');

  isPlaying = true;
  activePlayer = 1;
});
