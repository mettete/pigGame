'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const p1roll = document.querySelector('#score--0');
const p2roll = document.querySelector('#score--1');
const p1score = document.querySelector('#current--0');
const p2score = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
let playing = true;

const newGame = document.querySelector('.btn--new');
p1roll.textContent = 0;
p2roll.textContent = 0;
let scores = [0, 0];
let sira = 0;
let total = 0;
var random = 0;
dice.classList.add('hidden');
function numberGenarate() {
  return Math.floor(Math.random() * 6) + 1;
}
function resetGame() {
  scores = [0, 0];
  sira = 0;
  random = 0;
  total = 0;
  p1roll.textContent = 0;
  p2roll.textContent = 0;
  p1score.textContent = 0;
  p2score.textContent = 0;
  playing = true;
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
}

function switchPlayer() {
  document.getElementById(`current--${sira}`).textContent = 0;
  total = 0;
  sira = sira === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function (e) {
  if (playing) {
    random = numberGenarate();
    dice.src = `dice-${random}.png`;
    dice.classList.remove('hidden');
    if (random !== 1) {
      total += random;
      document.getElementById(`current--${sira}`).textContent = total;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function (e) {
  if (playing) {
    // active playerın skorunu ekle
    scores[sira] += total;
    document.getElementById(`score--${sira}`).textContent = scores[sira];
    // skor 100den büyükse oyunu biter

    if (scores[sira] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${sira}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${sira}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    }
    //bitmediyse diğer oyuncuya geç
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', resetGame);
