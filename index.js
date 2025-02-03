const colors = [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange'
  ];
  
  let score = 0;
  let targetColor = '';
  let colorButtons = document.querySelectorAll('[data-testid="colorOption"]');
  let colorBox = document.querySelector('[data-testid="colorBox"]');
  let gameStatus = document.querySelector('[data-testid="gameStatus"]');
  let scoreDisplay = document.querySelector('[data-testid="score"]');
  let newGameButton = document.querySelector('[data-testid="newGameButton"]');
  let gameInstructions = document.querySelector('[data-testid="gameInstructions"]');
  
  function generateRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  function setGame() {
    // Randomly select target color
    targetColor = generateRandomColor();
    colorBox.style.backgroundColor = targetColor;
  
    // Randomly assign colors to the options
    let shuffledColors = colors.sort(() => Math.random() - 0.5);
    colorButtons.forEach((button, index) => {
      button.style.backgroundColor = shuffledColors[index];
    });
  
    // Reset game status and score
    gameStatus.textContent = '';
  }
  
  function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
      gameStatus.textContent = 'Correct!';
      gameStatus.style.color = 'green';
      score++;
    } else {
      gameStatus.textContent = 'Wrong! Try Again.';
      gameStatus.style.color = 'red';
    }
    scoreDisplay.textContent = `Score: ${score}`;
  }
  
  function resetGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    setGame();
  }
  
  colorButtons.forEach(button => {
    button.addEventListener('click', () => {
      let selectedColor = button.style.backgroundColor;
      checkGuess(selectedColor);
    });
  });
  
  newGameButton.addEventListener('click', resetGame);
  
  // Initialize the game
  setGame();  