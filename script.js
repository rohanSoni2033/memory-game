const cardContainer = document.querySelector('.card-container');

const cardIcons = [
  { card_icon: 'lightbulb', color: '#ffff00,#ff4400' },
  { card_icon: 'fire-alt', color: '#ff0000,#ff8800' },
  { card_icon: 'calendar-alt', color: '#a12dee,#221a92' },
  { card_icon: 'heart', color: '#ff0000,#d43f9b' },
  { card_icon: 'seedling', color: '#00ff2a,#44b621' },
  { card_icon: 'camera', color: '#0044ff,#843fd4' },
  { card_icon: 'guitar', color: '#2f00ff,#e90101' },
  { card_icon: 'map', color: '#e6ff03,#23a012' },
  { card_icon: 'dice-five', color: '#ff0000,#8c00ff' },
  { card_icon: 'fan', color: '#029aff,#0aff53' },
  { card_icon: 'umbrella', color: '#ff0000,#8c00ff' },
  { card_icon: 'walking', color: '#029aff,#0aff53' },
  { card_icon: 'lightbulb', color: '#ffff00,#ff4400' },
  { card_icon: 'fire-alt', color: '#ff0000,#ff8800' },
  { card_icon: 'calendar-alt', color: '#a12dee,#221a92' },
  { card_icon: 'heart', color: '#ff0000,#d43f9b' },
  { card_icon: 'seedling', color: '#00ff2a,#44b621' },
  { card_icon: 'camera', color: '#0044ff,#843fd4' },
  { card_icon: 'guitar', color: '#2f00ff,#e90101' },
  { card_icon: 'map', color: '#e6ff03,#23a012' },
  { card_icon: 'dice-five', color: '#ff0000,#8c00ff' },
  { card_icon: 'fan', color: '#029aff,#0aff53' },
  { card_icon: 'umbrella', color: '#ff0000,#8c00ff' },
  {
    card_icon: 'walking',
    color: '#029aff,#0aff53',
  },
];

const cardColors = [
  '#ff4800, #f01544',
  '#0077ff, #15abf0',
  '#229389, #57c3ad',
  '#ff9900, #ff572d',
  '#6f00ff, #3623e4',
  '#ff0000, #d82acf',
];

const renderCards = () => {
  cardIcons.forEach(card => {
    const cardMarkup = `
    <div class="card" data-card="${card.card_icon}">
        <div class="card-faces front-faces flex-center">
            <i class="fas fa-${card.card_icon} card-icon" style="background-image: linear-gradient(to right bottom, ${card.color})"></i>
        </div>
        <div class="card-faces back-faces">
            <div class="bubbles first-bubble"></div>
            <div class="bubbles second-bubble"></div>
            <div class="bubbles third-bubble"></div>
            <div class="bubbles forth-bubble"></div>
        </div>
    </div>`;

    cardContainer.insertAdjacentHTML('afterbegin', cardMarkup);
  });
};

renderCards();

const renderModal = function (element) {
  const main = document.querySelector('.main');
  main.insertAdjacentElement('afterbegin', element);
};

let finishCard = 0;
let movesCount = 0;
const gameTime = 75;
let timeLeft = gameTime;
let totalWin = 0;
let totalLose = 0;
let winner = false;

let hasFlippedCard = false;
let firstCard, secondCard;
let lockCard;
let playerName;

const cards = document.querySelectorAll('.card');
const timeIndicator = document.querySelector('.time-indicator');
const cardBackFace = document.querySelectorAll('.back-faces');

// Game Music 🎵 /////////////////////////////////////////////

const gameMusic = document.getElementById('gameMusic');
const playMusicButton = document.getElementById('playMusicButton');
const pauseMusicButton = document.getElementById('pauseMusicButton');

playMusicButton.addEventListener('click', function () {
  gameMusic.play();
  pauseMusicButton.classList.toggle('hidden');
  playMusicButton.classList.toggle('hidden');
});

pauseMusicButton.addEventListener('click', function () {
  gameMusic.pause();
  playMusicButton.classList.toggle('hidden');
  pauseMusicButton.classList.toggle('hidden');
});

// Game Music 🎵 /////////////////////////////////////////

const shuffle = () => {
  cards.forEach(card => {
    const random = Math.floor(Math.random() * 20);
    card.style.order = random;
  });
};

shuffle();

const backgroundColor = () => {
  const randomColor = Math.floor(Math.random() * cardColors.length);

  cardBackFace.forEach(card => {
    card.style.backgroundImage = `linear-gradient(to right bottom, ${cardColors[randomColor]})`;
  });
};

backgroundColor();

const resetCard = () => {
  cards.forEach(card => card.classList.remove('show'));
};

const main = document.querySelector('.main');
const restartGameButton = document.getElementById('restartGameButton');

const init = function () {
  const startGameModal = renderStartGameModel();
  renderModal(startGameModal);
  const startGameButton = document.getElementById('startGameButton');
  startGameButton.addEventListener('click', function () {
    playerName = document.querySelector('.name').value;
    startGameModal.remove();
    startGame();
  });
  restartGameButton.addEventListener('click', resetGame);
};

document.querySelector('.movesCount').textContent = movesCount;

function startGame() {
  gameMusic.play();
  countdown();
}

const playAgain = () => {
  resetGame();
};

const tryAgain = () => {
  resetGame();
};

function hideCard() {
  lockCard = true;

  setTimeout(function () {
    unmatched.play();
    firstCard.classList.remove('show');
    secondCard.classList.remove('show');
    resetDeck();
  }, 800);
}

const countdown = () => {
  document.querySelector('.time').textContent = timeLeft + ' sec. Left';

  setInterval(function () {
    if (timeLeft === 0) {
      if (!winner) {
        loseGame();
      }
    } else if (timeLeft <= 0) {
      clearInterval((timeLeft = 0));
    }

    document.querySelector('.time').textContent = timeLeft + ' sec. Left';
    timeLeft -= 1;
    timeCal = ((gameTime - timeLeft) * 100) / gameTime;
    timeIndicator.style.width = timeCal + '%';
  }, 1000);
};

const show = function () {
  if (lockCard) return;
  if (this === firstCard) return;
  this.classList.add('show');
  movesCount++;
  document.querySelector('.movesCount').textContent = movesCount;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    check();
  }
};

const disableCard = () => {
  firstCard.classList.add('disabled');
  secondCard.classList.add('disabled');
  resetDeck();
};

const unDisableCard = () => {
  cards.forEach(card => card.classList.remove('disabled'));
  resetDeck();
};

const resetDeck = () => {
  [hasFlippedCard, lockCard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

const winGame = () => {
  winner = true;
  totalWin++;
  document.querySelector('.totalWinCount').innerHTML = totalWin;
  let totalTime = gameTime - timeLeft;

  setTimeout(() => {
    const markup = `
    <div class="modal win-game-modal">
        <div class="modal-first-bubble"></div>
        <div class="modal-second-bubble"></div>
        <h2>Game finished</h2>
        <p class="Congratulations">Great!! ${playerName} you won 🎉</p>
        <div>
        <p class="moveResult">🎯 total moves ${movesCount}</p>
        <p class="timeResult">⏳ total time ${totalTime} sec.</p>
        </div>
        
        <p>${playerName} you got a sharp memory🔥</p>
        <button type="button" id="playAgainButton" class="btn">Play again</button>
    </div>`;

    const winGameModal = Overlay(markup);

    renderModal(winGameModal);

    const playAgainButton = document.getElementById('playAgainButton');

    playAgainButton.addEventListener('click', () => {
      winGameModal.remove();
      playAgain();
    });
  }, 1000);
};

const loseGame = () => {
  totalLose++;
  document.querySelector('.totalLoseCount').innerHTML = totalLose;

  const markup = `
  <div class="modal lose-game-modal">
   <div class="modal-first-bubble"></div>
        <div class="modal-second-bubble"></div>
      <h2>Game finished</h2>
      <p>${playerName} you loss 😭 try again 👇</p>
      <button type="button" id="tryAgainGameButton" class="btn">
        try again
      </button>
  </div>
</div>`;

  const loseGameModal = Overlay(markup);
  renderModal(loseGameModal);

  const tryAgainGameButton = document.getElementById('tryAgainGameButton');

  tryAgainGameButton.addEventListener('click', () => {
    loseGameModal.remove();
    tryAgain();
  });
};

const resetGame = () => {
  backgroundColor();

  setTimeout(function () {
    shuffle();
  }, 500);

  resetCard();

  finishCard = 0;
  movesCount = 0;
  timeLeft = gameTime;
  winner = false;
  hasFlippedCard = false;
  document.querySelector('.movesCount').textContent = movesCount;
  unDisableCard();
};

console.log(cards.length);
const check = () => {
  if (firstCard.dataset.card !== secondCard.dataset.card) return hideCard();
  disableCard();
  finishCard++;
  matched.play();

  if (finishCard === cards.length / 2) {
    winGame();
  }
};

const addHandlerCard = function () {
  cards.forEach(card => card.addEventListener('click', show));
};

addHandlerCard();

const Overlay = function (element) {
  const overlay = document.createElement('div');
  overlay.setAttribute('class', 'overlay flex-center');
  overlay.insertAdjacentHTML('afterbegin', element);
  return overlay;
};

const renderStartGameModel = function () {
  const startGameModal = `
      <div class="modal start-game-model">
        <div class="modal-first-bubble"></div>
        <div class="modal-second-bubble"></div>
        <h2>memory game</h2>
          <p>
           On the game board, there are 12 pairs of identical images. Start the game by flipping a card. Then try to find another card that has the same icons as the first. If you can't find a pair, the flipped cards will be flipped back with the face down. Find all the pair within 75 seconds to win.
          </p>
          <p>Enter your name and hit on start game button.</p>
        <div class="input">
          <input type="text" id="playerName" class="name" placeholder="what's your name" />
        </div>
        <button type="button" id="startGameButton" class="btn">start game</button>
        <div class="flex-center">
        <p>
          made by <a href="www.twitter.com/rohanSoni2033">@rohanSoni2033</a>
        </p>
        </div>
        
      </div>`;

  return Overlay(startGameModal);
};

init();
