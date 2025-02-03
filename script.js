const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

let score = 0;
let targetColor = '';
const colorButtons = document.querySelectorAll('[data-testid="colorOption"]');
const colorBox = document.querySelector('[data-testid="colorBox"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

function generateRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function setGame() {
    // Randomly select a new target color
    targetColor = generateRandomColor();
    colorBox.style.backgroundColor = targetColor;

    // Randomly assign colors to the options
    let shuffledColors = colors.sort(() => Math.random() - 0.5);
    colorButtons.forEach((button, index) => {
        button.style.backgroundColor = shuffledColors[index];
        button.setAttribute('data-color', shuffledColors[index]);
    });

    // Reset game status and remove previous animations
    gameStatus.textContent = '';
    gameStatus.classList.remove('correct', 'wrong'); // Remove previous animations
}

function checkGuess(selectedColor) {
  if (selectedColor === targetColor) {
      gameStatus.textContent = 'Correct!';
      gameStatus.style.color = 'green';
      score++;
      gameStatus.classList.add('correct'); // Apply celebration animation
  } else {
      gameStatus.textContent = 'Wrong! Try Again.';
      gameStatus.style.color = 'red';
      gameStatus.classList.add('wrong'); // Apply fade-out animation
  }

  scoreDisplay.textContent = `Score: ${score}`;

  // Delay resetting the game to allow animations to complete
  setTimeout(() => {
      setGame();
  }, 1000); // 1-second delay
}

function resetGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    setGame();
}

// Add event listeners for color buttons
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedColor = button.getAttribute('data-color');
        checkGuess(selectedColor);
    });
});

// New game button resets the game
newGameButton.addEventListener('click', resetGame);

// Initialize the game
setGame();