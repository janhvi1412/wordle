const validWords = [
    'apple', 'grape', 'peach', 'mango', 'berry', 'lemon', 'melon', 'plumb', 'olive', 'guava',
    'cherry', 'apric', 'banan', 'kiwi', 'dates', 'fig', 'pear', 'cocoa', 'cumin', 'thyme',
    'basel', 'sugar', 'salts', 'lemur', 'panda', 'tiger', 'camel', 'whale', 'shark', 'horse',
    'zebra', 'sheep', 'goats', 'lions', 'eagle', 'crow', 'geese', 'ducks', 'quail', 'swan',
    'shrub', 'bloom', 'grass', 'weeds', 'cacti', 'ferns', 'vines', 'oaks', 'pines', 'palms'
];
let solution = '';
let currentRow = 0;
let gameEnded = false;

function startNewGame() {
    solution = validWords[Math.floor(Math.random() * validWords.length)];
    currentRow = 0;
    gameEnded = false;
    document.getElementById('board').innerHTML = `
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
    `;
    document.getElementById('guess-input').value = '';
    document.getElementById('message').innerText = '';
}

function makeGuess() {
    if (gameEnded) return;

    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.toLowerCase();

    if (guess.length !== 5) {
        alert('Guess must be a 5-letter word');
        return;
    }

    if (!validWords.includes(guess)) {
        document.getElementById('message').innerText = 'Invalid word. Please try again.';
        return;
    }

    document.getElementById('message').innerText = '';
    const boardRow = document.getElementById('board').children[currentRow];
    
    for (let i = 0; i < 5; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');

        if (guess[i] === solution[i]) {
            tile.classList.add('correct');
        } else if (solution.includes(guess[i])) {
            tile.classList.add('present');
        } else {
            tile.classList.add('absent');
        }

        tile.innerText = guess[i];
        boardRow.appendChild(tile);
    }

    currentRow++;
    guessInput.value = '';

    if (guess === solution) {
        document.getElementById('message').innerText = 'Congratulations! You guessed the word!';
        gameEnded = true;
    } else if (currentRow === 6) {
        document.getElementById('message').innerText = `Game over! The word was ${solution}.`;
        gameEnded = true;
    }
}

// Initialize the game when the page loads
window.onload = startNewGame;
