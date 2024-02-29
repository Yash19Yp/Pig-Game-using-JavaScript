// To pick element from the DOM tree
const $ = (selector) => document.querySelector(selector);

// Initial game start logic
let currentScore = 0;
let activePlayer = 1;

const dice = $(".dice");
dice.style.display = "none";

$("#player1TtlScore").value = 0;
$("#player2TtlScore").value = 0;
$("#player1CrtScore").value = 0;
$("#player2CrtScore").value = 0;

// To calculate total score and switch players
const holdClick = () => {
  const crtPlayer = activePlayer === 1 ? "player1" : "player2";
  let playerCrtScore = $(`#${crtPlayer}CrtScore`);
  let playerTtlScore = $(`#${crtPlayer}TtlScore`);

  const totalScore =
    parseInt(playerCrtScore.value) + parseInt(playerTtlScore.value);

  // To check winner
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

// To toggle players
const statusChange = () => {
  $(`#player${activePlayer}CrtScore`).value = 0;

  // CSS for active player
  $(`.player${activePlayer}`).classList.remove("active");
  $(`.player${activePlayer === 1 ? 2 : 1}`).classList.add("active");

  activePlayer = activePlayer === 1 ? 2 : 1;

  currentScore = 0;
};

// Roll Dice logic
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

// To reset the game
const resetGame = () => {
  activePlayer = 1;
  dice.style.display = "none";

  $(".player1").classList.add("active");
  $(".player2").classList.remove("active");

  $("#player1TtlScore").value = 0;
  $("#player2TtlScore").value = 0;
  $("#player1CrtScore").value = 0;
  $("#player2CrtScore").value = 0;
};

// EventListeners for buttons
$("#rollDice").addEventListener("click", rollDice); // Event listener for roll dice button
$("#hold").addEventListener("click", holdClick); // Event listener for hold button
$("#reset").addEventListener("click", resetGame); // Event listener for reset button
