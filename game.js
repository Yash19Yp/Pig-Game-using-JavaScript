const $ = (selector) => document.querySelector(selector);

let currentScore = 0;
let activePlayer = 1;

const dice = $(".dice");
dice.style.display = "none";

const holdClick = () => {
  const crtPlayer = activePlayer === 1 ? "player1" : "player2";
  let playerCrtScore = $(`#${crtPlayer}CrtScore`);
  let playerTtlScore = $(`#${crtPlayer}ttlScore`);

  const totalScore =
    parseInt(playerCrtScore.value) + parseInt(playerTtlScore.value);

  if (totalScore >= 100) {
    alert(`${crtPlayer} is Winner!!`);
    resetGame();
  } else {
    playerTtlScore.value = totalScore;
    playerCrtScore.value = 0;

    currentScore = 0;
    statusChange();
  }
};

const statusChange = () => {
  $(`#player${activePlayer}CrtScore`).value = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  currentScore = 0;
};

const rollDice = () => {
  const generatedScore = Math.floor(Math.random() * 6) + 1;
  dice.src = `images/dice-${generatedScore}.svg`;
  dice.style.display = "inline-block";
  const playerCrtScore = $(`#player${activePlayer}CrtScore`);
  if (generatedScore > 1) {
    playerCrtScore.value = generatedScore + parseInt(playerCrtScore.value);
  } else {
    statusChange();
  }
};

$("#rollDice").addEventListener("click", rollDice);
$("#hold").addEventListener("click", holdClick);

$("#player1ttlScore").value = 0;
$("#player2ttlScore").value = 0;
$("#player1CrtScore").value = 0;
$("#player2CrtScore").value = 0;

const resetGame = () => {
  dice.style.display = "none";
  $("#player1ttlScore").value = 0;
  $("#player2ttlScore").value = 0;
  $("#player1CrtScore").value = 0;
  $("#player2CrtScore").value = 0;
};

$("#reset").addEventListener("click", resetGame);
