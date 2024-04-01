const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score h3");
const heighScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let foodX, foodY;
let snackX = 5,
  snackY = 11;
let veloCityX = 0,
  veloCityY = 0;
let snackBody = [];
let gameOver = false;
let setIntervalValid;
let score = 0;
let heighScore = localStorage.getItem(".high-score") || 0;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  clearInterval(setIntervalValid);
  alert("Game Over! Press Ok to Replay...");
  location.reload();
};

const initGame = () => {
  if (gameOver) handleGameOver();

  if (snackX === foodX && snackY === foodY) {
    changeFoodPosition();
    snackBody.push([foodX, foodY]);
    score++;

    heighScore = score >= heighScore ? score : heighScore;
    localStorage.setItem(".high-score", heighScore);
    scoreElement.innerText = `Score: ${score}`;
    heighScoreElement.innerText = `Heigh Score: ${heighScore}`;
  }

  for (let i = snackBody.length - 1; i > 0; i--) {
    snackBody[i] = snackBody[i - 1];
  }

  snackBody[0] = [snackX, snackY];

  snackX += veloCityX;
  snackY += veloCityY;

  if (snackX <= 0 || snackX > 30 || snackY <= 0 || snackY > 30) {
    gameOver = true;
  }

  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  for (let i = 0; i < snackBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snackBody[i][1]} / ${snackBody[i][0]}"></div>`;

    if (
      i !== 0 &&
      snackBody[0][1] === snackBody[i][1] &&
      snackBody[0][0] === snackBody[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && veloCityY != 1) {
    veloCityX = 0;
    veloCityY = -1;
  } else if (e.key === "ArrowDown" && veloCityY != -1) {
    veloCityX = 0;
    veloCityY = 1;
  } else if (e.key === "ArrowRight" && veloCityX != -1) {
    veloCityX = 1;
    veloCityY = 0;
  } else if (e.key === "ArrowLeft" && veloCityX != 1) {
    veloCityX = -1;
    veloCityY = 0;
  }
};

controls.forEach((key) => {
  key.addEventListener("click", () => {
    changeDirection({ key: key.dataset.key });
  });
});

changeFoodPosition();
setIntervalValid = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
