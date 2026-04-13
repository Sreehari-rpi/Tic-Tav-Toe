const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const resetBtn = document.getElementById('resetBtn');
const playerXIndicator = document.getElementById('playerX');
const playerOIndicator = document.getElementById('playerO');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const winnerOverlay = document.getElementById('winnerOverlay');
const winnerText = document.getElementById('winnerText');
const nextGameBtn = document.getElementById('nextGameBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
};

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase()); // Adds .x or .o class
};

const handleResultValidation = () => {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningCells = winCondition;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        
        // Highlight winning cells
        winningCells.forEach(index => {
            cells[index].classList.add('winning-cell');
        });

        // Update score
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXElement.innerText = scoreX;
            winnerText.innerText = 'X WINS! 🔥';
        } else {
            scoreO++;
            scoreOElement.innerText = scoreO;
            winnerText.innerText = 'O WINS! 💀';
        }

        setTimeout(() => {
            winnerOverlay.classList.remove('hidden');
        }, 500);
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        gameActive = false;
        winnerText.innerText = 'IT\'S A TIE 👀';
        setTimeout(() => {
            winnerOverlay.classList.remove('hidden');
        }, 500);
        return;
    }

    handlePlayerChange();
};

const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
    // Update Indicators
    if (currentPlayer === 'X') {
        playerXIndicator.classList.add('active');
        playerOIndicator.classList.remove('active');
        statusMessage.innerText = 'Your turn, 🔥!';
    } else {
        playerOIndicator.classList.add('active');
        playerXIndicator.classList.remove('active');
        statusMessage.innerText = 'Your turn, 💀!';
    }
};

const restartGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusMessage.innerText = 'Your turn, 🔥!';
    
    playerXIndicator.classList.add('active');
    playerOIndicator.classList.remove('active');
    
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o', 'winning-cell');
    });

    winnerOverlay.classList.add('hidden');
};

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', restartGame);
nextGameBtn.addEventListener('click', restartGame);
