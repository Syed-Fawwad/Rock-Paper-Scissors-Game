let userScore = 0;
let compScore = 0;
let totalRounds = 5; // Default is Best of 5
let difficulty = "medium"; // Default difficulty

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// Sound Effects
const clickSound = new Audio("./sounds/click.mp3");
const winSound = new Audio("./sounds/win.mp3");
const loseSound = new Audio("./sounds/lose.mp3");
const drawSound = new Audio("./sounds/draw.mp3");

// Generate Computer Choice Based on Difficulty
const genCompChoice = (userChoice) => {
  const options = ["rock", "paper", "scissors"];
  if (difficulty === "easy") {
    // 70% chance to make a losing move
    const losingChoice = options.find(
      (choice) => choice !== userChoice && choice !== getWinningChoice(userChoice)
    );
    return Math.random() < 0.7 ? losingChoice : randomChoice(options);
  } else if (difficulty === "hard") {
    // 70% chance to make a winning move
    const winningChoice = getWinningChoice(userChoice);
    return Math.random() < 0.7 ? winningChoice : randomChoice(options);
  }
  // Medium: random
  return randomChoice(options);
};

const randomChoice = (choices) => {
  return choices[Math.floor(Math.random() * 3)];
};

const getWinningChoice = (choice) => {
  if (choice === "rock") return "paper";
  if (choice === "paper") return "scissors";
  return "rock";
};

// Update Game Result
const drawGame = () => {
  msg.innerText = "Draw! Play Again";
  msg.style.backgroundColor = "#081b31";
  drawSound.play();
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText =` You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    winSound.play();
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lose! ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    loseSound.play();
  }
};

// Check Game Over
const checkGameOver = () => {
  if (userScore === totalRounds || compScore === totalRounds) {
    const winner = userScore > compScore ? "You win the game!" : "Computer wins the game!";
    alert(winner);
    resetGame();
  }
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = "0";
  compScorePara.innerText = "0";
  msg.innerText = "Play Your Move";
  msg.style.backgroundColor = "#081b31";
};

// Play the Game
const playGame = (userChoice) => {
  clickSound.play();
  const compChoice = genCompChoice(userChoice);
  if (userChoice === compChoice) {
    drawGame();
  } else {
    const userWin =
      (userChoice === "rock" && compChoice === "scissors") ||
      (userChoice === "paper" && compChoice === "rock") ||
      (userChoice === "scissors" && compChoice === "paper");
    showWinner(userWin, userChoice, compChoice);
  }
  checkGameOver();
};

// Event Listeners for Choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Event Listeners for Modes
document.getElementById("best-of-5").addEventListener("click", () => {
  totalRounds = 5;
  resetGame();
});

document.getElementById("best-of-10").addEventListener("click", () => {
  totalRounds = 10;
  resetGame();
});

// Event Listeners for Difficulty
document.getElementById("easy").addEventListener("click", () => {
  difficulty = "easy";
});

document.getElementById("medium").addEventListener("click", () => {
  difficulty = "medium";
});

document.getElementById("hard").addEventListener("click", () => {
  difficulty = "hard";
});
// Helper Function to Clear Active State
const clearActiveState = (buttons) => {
    buttons.forEach((btn) => btn.classList.remove("active"));
  };
  
  // Add Event Listeners for Modes
  const modeButtons = document.querySelectorAll(".mode-btn");
  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      clearActiveState(modeButtons); // Remove active class from all buttons
      button.classList.add("active"); // Add active class to the clicked button
    });
  });
  
  // Add Event Listeners for Difficulty
  const difficultyButtons = document.querySelectorAll(".difficulty-btn");
  difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      clearActiveState(difficultyButtons); // Remove active class from all buttons
      button.classList.add("active"); // Add active class to the clicked button
    });
  });