'use strict';
import { initializeGame, playTurn } from "./index.js";

const player1NameInput = document.getElementById('player1NameInput');
const startButton = document.getElementById('startGame');
const restartButton = document.getElementById('restartGame');

const gameScreen = document.getElementById('gameScreen') 
const player1Name = document.getElementById('player1Name');  
const startScreen = document.getElementById('startScreen'); 

const player1Board = document.getElementById('player1Board');
const player2Board = document.getElementById('player2Board');
const turnMessage = document.getElementById('turnMessage');

let activeTimeoutId = null;
let currentGame = null;

startButton.addEventListener('click', () => {
    if (player1NameInput.value !=='') { startGame(); } 
    else { player1NameInput.classList.add("error");}
})
restartButton.addEventListener('click', resetGame);

player2Board.addEventListener("click", (event) => {
    let x = Number(event.target.dataset.x);
    let y = Number(event.target.dataset.y);
    attackEnemy(x, y );
})

function attackEnemy(x,y) {
    if (Number.isNaN(x)) { return }
    currentGame.player1.attack([x,y]);
    drawPlayer2Board(currentGame.player1.enemyBoard.battlefield);
    if (currentGame.player1.enemyBoard.battlefield[x][y] !== 'X') {
        player2Board.classList.add('disabled');
        currentGame.currentPlayer = currentGame.currentPlayer === currentGame.player2 ? currentGame.player1 : currentGame.player2;
    }
    showTurnMessage();
    if (!currentGame.isOver) {
        activeTimeoutId = setTimeout(() => playTurn(currentGame), 3000);
    }
}

function startGame() {
    currentGame = initializeGame(player1NameInput.value);
    drawPlayer1Board(currentGame.player1.board.battlefield);
    drawPlayer2Board(currentGame.player2.board.battlefield);
    showTurnMessage();
    if (!currentGame.currentPlayer.isHuman) {
        player2Board.classList.add('disabled');
        setTimeout(() => playTurn(currentGame), 2000);
    } 
    else {
        playTurn(currentGame);
    }
    drawShips();
    gameScreen.style.display = 'block';
    startScreen.style.display = 'none';
    restartButton.style.display = 'block';
    player1Name.textContent = player1NameInput.value;
}

export function drawAll(game) {
    drawPlayer1Board(game.player1.board.battlefield)
    drawPlayer2Board(game.player2.board.battlefield)
    drawShips();
    showTurnMessage();
}

function showTurnMessage() {
    turnMessage.textContent = `${currentGame.currentPlayer.name} is attacking`;
}

function drawPlayer1Board(battlefield = '') {
    player1Board.textContent = '';
    for (let i = 0; i<=9; i++) {
        let string = document.createElement('div');
            for (let j=0; j<=9; j++) {
                let cell = document.createElement('div');
                cell.classList.add('empty');
                if( battlefield !=='')
                { 
                    if (battlefield[i][j] ==='-') {
                    } 
                    if ((typeof(battlefield[i][j]) !== 'object') && (battlefield[i][j] !=='-')) {
                        cell.classList.remove('empty');
                        if ((battlefield[i][j] === 'M') || (battlefield[i][j] === 'B')) {
                            cell.classList.add('miss');
                        }
                        else {
                            cell.classList.add('hit');
                        }
                    }
                }
                string.appendChild(cell)
            }
        player1Board.appendChild(string)
    }
}

function drawPlayer2Board(battlefield = '') {
    player2Board.classList.remove('disabled');
    player2Board.textContent = '';
    for (let i = 0; i<=9; i++) {
        let string = document.createElement('div');
            for (let j=0; j<=9; j++) {
                let cell = document.createElement('div');
                cell.dataset.x = i;
                cell.dataset.y = j;
                cell.classList.add('empty');
                if( battlefield !=='')
                { 
                    if ((typeof(battlefield[i][j]) !== 'object') && (battlefield[i][j] !=='-')) {
                        cell.classList.remove('empty');
                        if ((battlefield[i][j] === 'M') || (battlefield[i][j] === 'B')) {
                            cell.classList.add('miss');
                        }
                        else {
                            cell.classList.add('hit');
                        }
                    } else {
                        // cell.textContent = '' 
                    }
                }
                string.appendChild(cell)
            }
        player2Board.appendChild(string)
    }
}

function drawShips() {
    const fleet = currentGame.player1.board.fleet;
    for (let i = 0; i < fleet.length; i++) {
        const [x, y] = fleet[i].coordinates[0];
        const shipDiv = document.createElement('div');
        shipDiv.classList.add('ship', fleet[i].type);  
        if (fleet[i].length > 1) {
            const [x1,y1] = fleet[i].coordinates[fleet[i].coordinates.length-1];
            if (x === x1) {
                shipDiv.classList.add('rotate90');
                // console.log(`корабль ${fleet[i].type} лежит горизонтально`)
                if (y > y1) {
                    shipDiv.style.left = `${y1 * 55}px`; 
                    shipDiv.style.top = `${x1 * 55+55}px`;  
                }
                else {
                    shipDiv.style.left = `${y * 55}px`; 
                    shipDiv.style.top = `${x * 55+55}px`;
                }
            }
            if (x > x1) {
                shipDiv.style.left = `${y1 * 55}px`; 
                shipDiv.style.top = `${x1 * 55}px`;  
                // console.log(`корабль ${fleet[i].type} лежит вертикально снизу вверх`)
            }
            if (x < x1) {
                shipDiv.style.left = `${y * 55}px`;
                shipDiv.style.top = `${x * 55}px`; 
            }
        }
        shipDiv.style.width = `55px`;
        shipDiv.style.height = `${fleet[i].length * 55}px`;
        if (fleet[i].length === 1) {
        shipDiv.style.left = `${y * 55}px`;  
        shipDiv.style.top = `${x * 55}px`;  
        }
        shipDiv.style.position = 'absolute';
        document.querySelector('#player1Board').appendChild(shipDiv);
    }
}

export function gameOver() {
    drawPlayer1Board(currentGame.player1.board.battlefield)
    drawPlayer2Board(currentGame.player2.board.battlefield)
    drawShips();
    currentGame.isOver = true;
    player2Board.classList.add('disabled');
    turnMessage.classList.add('gameover');
    turnMessage.textContent = `Game Over. ${currentGame.currentPlayer.name} win`;
    return
}


function resetGame() {
    turnMessage.classList.remove('gameover'); 
    turnMessage.textContent = '';
    drawPlayer1Board();
    drawPlayer2Board();
    currentGame = null;
    player1NameInput.value = '';
    player2Board.classList.add('disabled');
    clearTimeout(activeTimeoutId);
    activeTimeoutId = null;
    gameScreen.style.display = 'none';
    startScreen.style.display = 'block';
    restartButton.style.display = 'none';
    player1NameInput.classList.remove("error")
} 

drawPlayer1Board();
drawPlayer2Board();
