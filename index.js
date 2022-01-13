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

const colors = [
  '#ff4800, #f01544',
  '#0077ff, #15abf0',
  '#229389, #57c3ad',
  '#ff9900, #ff572d',
  '#6f00ff, #3623e4',
  '#ff0000, #d82acf',
];

class Game {
  playerName;
  gameTime;

  constructor() {
    this._createCards();
    this.deck = document.querySelectorAll('.card');
    this._shuffle();
  }

  _createCards() {
    const randomColor = Math.floor(Math.random() * colors.length);
    cards.forEach((card) => {
      const html = `
    <div class="card" data-card="${card.card_icon}">
        <div class="frontFace cardFaces">
            <i class="fas fa-${card.card_icon} icon" style="background-image: linear-gradient(to right bottom, ${card.color})"></i>
        </div>
        <div class="backFace cardFaces" style="background-image:linear-gradient(to right bottom, ${colors[randomColor]})">
            <div class="first-bubble bubbles"></div>
            <div class="second-bubble bubbles"></div>
            <div class="third-bubble bubbles"></div>
            <div class="forth-bubble bubbles"></div>
        </div>
    </div>`;

      cardContainer.insertAdjacentHTML('afterbegin', html);
    });
  }
  _shuffle() {
    this.deck.forEach((card) => {
      const random = Math.floor(Math.random() * 20);
      card.style.order = random;
    });
  }
}

new Game();
