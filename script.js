const cardContainer = document.querySelector('.cardContainer');

const cards = [
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
];

const createCards = () => {
  cards.forEach((card) => {
    const html = `
    <div class="card" data-card="${card.card_icon}">
        <div class="frontFace cardFaces">
            <i class="fas fa-${card.card_icon} icon" style="background-image: linear-gradient(to right bottom, ${card.color})"></i>
        </div>
        <div class="backFace cardFaces">
            <div class="first-bubble bubbles"></div>
            <div class="second-bubble bubbles"></div>
            <div class="third-bubble bubbles"></div>
            <div class="forth-bubble bubbles"></div>
        </div>
    </div>`;

    cardContainer.insertAdjacentHTML('afterbegin', html);
  });
};

createCards();
createCards();

var finishCard = 0;
var movesCount = 0;
let gameTime = 65;
let timeLeft = gameTime;
let totalWin = 0;
let totalLose = 0;
let winner = false;

let hasFlippedCard = false;
let firstCard, secondCard;
let lockCard;
let playerName;

const deck = document.querySelectorAll('.card');
const timeCounterBackground = document.querySelector('.timeCounterBackground');
const username = document.querySelectorAll('.enteredName');
const cardBackFace = document.querySelectorAll('.backFace');

var myMusic = document.getElementById('music');
document.querySelector('.play').addEventListener('click', play);
document.querySelector('.pause').addEventListener('click', pause);

function play() {
  myMusic.play();
}

function pause() {
  myMusic.pause();
}

shuffle();

const backgroundColor = () => {
  const colors = [
    '#ff4800, #f01544',
    '#0077ff, #15abf0',
    '#229389, #57c3ad',
    '#ff9900, #ff572d',
    '#6f00ff, #3623e4',
    '#ff0000, #d82acf',
  ];
  const randomColor = Math.floor(Math.random() * colors.length);

  cardBackFace.forEach((card) => {
    card.style.backgroundImage = `linear-gradient(to right bottom, ${colors[randomColor]})`;
  });
};

backgroundColor();

function resetCard() {
  for (var i = 0; i < deck.length; i++) {
    deck[i].classList.remove('show');
  }
}

const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const playAgainButton = document.getElementById('playAgainButton');
const tryAgainButton = document.getElementById('tryAgainButton');

const overlay = document.querySelector('.overlay');
const startGameModal = document.querySelector('.startGame');
const winGameModal = document.querySelector('.winGame');
const loseGameModal = document.querySelector('.loseGame');

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', resetGame);
playAgainButton.addEventListener('click', playAgain);
tryAgainButton.addEventListener('click', tryAgain);
document.querySelector('.movesCount').textContent = movesCount;

function startGame() {
  myMusic.play();
  playerName = document.querySelector('.name').value;
  startGameModal.classList.add('hidden');
  overlay.classList.add('hidden');
  countdown();

  for (var i = 0; i < username.length; i++) {
    username[i].textContent = playerName;
  }
}

function playAgain() {
  resetGame();
  overlay.classList.add('hidden');
  winGameModal.classList.add('hidden');
}

function tryAgain() {
  resetGame();
  overlay.classList.add('hidden');
  loseGameModal.classList.add('hidden');
}

function hideCard() {
  lockCard = true;

  setTimeout(
    function () {
      unmatched.play();
      firstCard.classList.remove('show');
      secondCard.classList.remove('show');
      resetDeck();
    },

    800
  );
}

function countdown() {
  document.querySelector('.time').textContent = timeLeft + 's';

  setInterval(
    function () {
      if (timeLeft == 0) {
        if (!winner) {
          loseGame();
        }
      } else if (timeLeft <= 0) {
        clearInterval((timeLeft = 0));
      }

      document.querySelector('.time').textContent = timeLeft + 's';
      timeLeft -= 1;
      timeCal = ((gameTime - timeLeft) * 100) / gameTime;
      timeCounterBackground.style.width = timeCal + '%';
    },

    1000
  );
}

function show() {
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
}

function check() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCard();
    finishCard++;
    matched.play();

    if (finishCard == 10) {
      winGame();
    }
  } else {
    hideCard();
  }
}

function disableCard() {
  firstCard.classList.add('disabled');
  secondCard.classList.add('disabled');
  resetDeck();
}

function unDisableCard() {
  for (var i = 0; i < deck.length; i++) {
    deck[i].classList.remove('disabled');
  }

  resetDeck();
}

function resetDeck() {
  [hasFlippedCard, lockCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function winGame() {
  winner = true;
  totalWin++;
  document.querySelector('.totalWinCount').innerHTML = totalWin;
  let totalTime = gameTime - timeLeft;

  setTimeout(function () {
    overlay.classList.remove('hidden');
    winGameModal.classList.remove('hidden');
    document.querySelector('#totalMove').textContent = movesCount;
    document.querySelector('#totalTime').textContent = totalTime + 's';
  }, 1000);
}

function loseGame() {
  totalLose++;
  document.querySelector('.totalLoseCount').innerHTML = totalLose;
  overlay.classList.remove('hidden');
  loseGameModal.classList.remove('hidden');
}

function resetGame() {
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
}

for (var i = 0; i < deck.length; i++) {
  deck[i].addEventListener('click', show);
}

function shuffle() {
  deck.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 20);
    card.style.order = randomPos;
  });
}
