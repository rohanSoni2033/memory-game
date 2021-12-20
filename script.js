var randomColor;
var finishCard = 0;
var movesCount = 0;
let gameTime = 65;
let timeLeft = gameTime;
let totalWin = 0;
let totalLose = 0;
let winner = false;
var deck = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockCard;
let playerName;
const timeCounterBackground = document.querySelector('.timeCounterBackground');

let nameArray = document.querySelectorAll('.enteredName');
document.querySelector('.movesCount').textContent = movesCount;
var cardBackFace = document.querySelectorAll('.backFace');

var myMusic = document.getElementById('music');
document.querySelector('.play').addEventListener('click', play);
document.querySelector('.pause').addEventListener('click', pause);

function play() {
  myMusic.play();
}

function pause() {
  myMusic.pause();
}

backgroundColor();
shuffle();

function backgroundColor() {
  randomColor = Math.trunc(Math.random() * 6 + 1);
  console.log(randomColor);

  for (var i = 0; i < cardBackFace.length; i++) {
    cardBackFace[i].classList.remove(
      'backFaceBGColorRed',
      'backFaceBGColorGreen',
      'backFaceBGColorPurple',
      'backFaceBGColorBlue',
      'backFaceBGColorOrange',
      'backFaceBGColorYellow'
    );

    if (randomColor == 1) {
      cardBackFace[i].classList.add('backFaceBGColorRed');
    } else if (randomColor == 2) {
      cardBackFace[i].classList.add('backFaceBGColorGreen');
    } else if (randomColor == 3) {
      cardBackFace[i].classList.add('backFaceBGColorPurple');
    } else if (randomColor == 4) {
      cardBackFace[i].classList.add('backFaceBGColorOrange');
    } else if (randomColor == 5) {
      cardBackFace[i].classList.add('backFaceBGColorBlue');
    } else if (randomColor == 6) {
      cardBackFace[i].classList.add('backFaceBGColorYellow');
    }
  }
}

function resetCard() {
  for (var i = 0; i < deck.length; i++) {
    deck[i].classList.remove('show');
  }
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restart').addEventListener('click', resetGame);
document.getElementById('playAgain').addEventListener('click', playAgain);
document.getElementById('tryAgain').addEventListener('click', tryAgain);

function startGame() {
  myMusic.play();
  playerName = document.querySelector('.name').value;
  console.log(playerName);
  document.querySelector('.startGame').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
  countdown();

  for (var i = 0; i < nameArray.length; i++) {
    nameArray[i].textContent = playerName;
  }
}

function playAgain() {
  resetGame();
  document.querySelector('.overlay').classList.add('hidden');
  document.querySelector('.winGame').classList.add('hidden');
}

function tryAgain() {
  resetGame();
  document.querySelector('.overlay').classList.add('hidden');
  document.querySelector('.loseGame').classList.add('hidden');
}

function hideCard() {
  lockCard = true;
  console.log('different card');

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
    document.querySelector('.overlay').classList.remove('hidden');
    document.querySelector('.winGame').classList.remove('hidden');
    document.querySelector('#totalMove').textContent = movesCount;
    document.querySelector('#totalTime').textContent = totalTime + 's';
  }, 1000);
}

function loseGame() {
  totalLose++;
  document.querySelector('.totalLoseCount').innerHTML = totalLose;
  document.querySelector('.overlay').classList.remove('hidden');
  document.querySelector('.loseGame').classList.remove('hidden');
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
