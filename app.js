// Created arrays for cards
// array for flipped cards
const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
// flippedCards array value
let flippedCards = [];
let matchedPairs = 0;
const totalPairs = cardsArray.length / 2;
let wrongAttempts = 0;
const maxWrongAttempts = 3;



//-----------------------------------------------------
// Used sort method
// Substracting 0.5 makes two elements swap places
// var Math
function shuffleCards() {
cardsArray.sort(() => Math.random() - 0.5);
}
// ----cards not shuffling-----



// Selecting the board in HTML
// ASK IF IT MATTERS TO D
function initializeGame() {
const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');
gameBoard.innerHTML = '';
message.textContent = '';
flippedCards = [];
matchedPairs = 0;
wrongAttempts = 0;
shuffleCards();

// Creating a container element for each card
// assign class and stores its value
cardsArray.forEach((cardValue) => {
  const card = document.createElement('div');
  card.classList.add('card');

  // Storing the value in the data? idk REMEMBER TO ASK!!
  card.dataset.value = cardValue;

  // Adding actions and reactions
  // place card in gameBoard container
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
});
}

//----------------------------------------------------

function flipCard() {

    // Preventing flipping the card if already flipped or 2 cards flipped.
  if (this.classList.contains('flipped') || flippedCards.length >= 2) return;

  // Adds flipped class value and stores it in flippedCards
  this.classList.add('flipped');
// 'this' is a clikced card
  // temporary card value
  this.textContent = this.dataset.value;


  // adding flipped cards
  flippedCards.push(this);


  // when 2 cards are flippedq checkMatch runs after
  // 1 second to check for a match
  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

// retrieving 2 cards
function checkMatch() {
  const [card1, card2] = flippedCards;

  // if cards match removes event listeners
  if (card1.dataset.value === card2.dataset.value) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    matchedPairs++;
// removing 'click' for further flipping
// Increase the matchedPairs


// Setting my win/lose conditions
    if (matchedPairs === totalPairs) {
        document.getElementById('message').textContent = 'Winner!';
    }
  } else {
    wrongAttempts++;
    if (wrongAttempts >= maxWrongAttempts) {
        document.getElementById('message').textContent = 'You lost!';
        endGame();
        return;
      }

    // remove class if cards dont match
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.textContent = '';
    card2.textContent = '';
  }
  // This is the reset
  // clears the array for the next turn
  flippedCards = [];
}

// End the game
// basically just disabling interactions
function endGame() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.removeEventListener('click', flipCard);
    })
}
document.getElementById('restartButton').addEventListener('click', () => {
    initializeGame();
  });

  initializeGame();























// const gridContainer = document.querySelector(".grid-container");
// let cards = [];
// let card1, card2;


//card.addEventListener('click', flipCard());
// function checkMatch() {
//  if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
//    flippedCards = [];
//  } else {
//    flippedCards[0].classList.remove('flipped');
//    flippedCards[1].classList.remove('flipped');
//  }
//}

// initializeGame;
// document.getElementById('restartButton').addEventListener('click', () => {
//  initializeGame();
// });
