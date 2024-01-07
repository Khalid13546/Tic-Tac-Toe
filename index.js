const boxes = document.querySelectorAll(".box");
const restartButton = document.querySelector("#restart");
const turns = document.querySelector("#turn");
const winConditions = [
  [0, 1, 2],
  [3, 5, 4],
  [7, 8, 6],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

start();

function start() {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  restartButton.addEventListener("click", restartGame);
  turns.textContent = `${currentPlayer}'s turn`;
}

function boxClicked() {
  const boxIndex = this.getAttribute("index");

  if (board[boxIndex] !== "" || !gameActive) {
    return;
  } else {
    updateBox(this, boxIndex);
    checkWinner();
  }
}

function updateBox(box, index) {
  board[index] = currentPlayer;
  box.textContent = currentPlayer;
  console.log(`Updated box with index ${index} to ${currentPlayer}`);
}
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turns.textContent = `${currentPlayer}'s turn`;
  console.log(`Changed player to ${currentPlayer}`);
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const pattern = winConditions[i];
    const box0 = board[pattern[0]];
    const box1 = board[pattern[1]];
    const box2 = board[pattern[2]];

    if (box0 === "" || box1 === "" || box2 === "") {
      continue;
    }

    if (box0 === box1 && box1 === box2) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    winningPlayer = currentPlayer;
    turns.textContent = `${winningPlayer} wins!`;
    gameActive = false;
  } else if (!board.includes("")) {
    turns.textContent = "Draw!";
    gameActive = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  turns.textContent = `${currentPlayer}'s turn`;
  boxes.forEach((box) => (box.textContent = ""));
  gameActive = true;
}
