const X_CLASS = "x";
const CIRCLE_CLASS = "circle"
const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restart");
const winnerMessageElement = document.getElementById("win-message");
const winnerTextElement = document.querySelector("[data-win-message]");
let circleTurn;

startGame();

restartButton.addEventListener("click", restartGame);

function startGame() {
  // alert(circleTurn ? "O" : "X")
  // circleTurn = false;
  cellElements.forEach(cell => {
    cell.addEventListener("click", handleClick, { once: true })
  });
  setBoardHoverClass();
}

function restartGame() {
  winnerMessageElement.classList.remove("show");
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
  });
  startGame()
}

function handleClick(e) {
  // placemark
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placemark(cell, currentClass);
  // check for win 
  // check for draw
  if (checkWin(currentClass)) {
    endGame(false);
    // switch Turn
    switchTurn();
  }
  else if (isDraw()) {
    endGame(true);
    // switch Turn
    switchTurn();
  }
  else {
    // switch Turn
    switchTurn();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winnerTextElement.innerText = "Draw!";
  }
  else {
    winnerTextElement.innerText = `${circleTurn ? "O" : "X"} wins!`;
  }
  winnerMessageElement.classList.add("show");
}

function placemark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurn() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  }
  else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WIN_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}