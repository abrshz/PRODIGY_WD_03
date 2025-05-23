const cells = document.querySelectorAll('.cell');
const messageDisplay = document.querySelector('.message');
const restartButton = document.getElementById('restartBtn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

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

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkWin();
    checkDraw();
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameBoard[winCondition[0]];
        const b = gameBoard[winCondition[1]];
        const c = gameBoard[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            messageDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
    }
}

function checkDraw() {
    if (!gameBoard.includes('') && gameActive) {
        messageDisplay.textContent = "It's a draw!";
        gameActive = false;
    }
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    messageDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);