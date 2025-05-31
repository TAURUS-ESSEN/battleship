'use strict';
import { initializeGame, playTurn } from "./index.js";
import { toggleSound } from "./sounds.js";
import './css/style.css';

const player1NameInput = document.getElementById('player1NameInput');
const startButton = document.getElementById('startGame');
const restartButton = document.getElementById('restartGame');
const soundButton = document.getElementById('soundButton')

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

soundButton.addEventListener('click', () => {
    toggleSound();
    soundButton.classList.toggle("soundButtonOff");
})


function attackEnemy(x,y) {
    if (!currentGame || Number.isNaN(x) || Number.isNaN(y)) return;
    const result = currentGame.player1.attack([x, y])
    drawBoard(player2Board, currentGame.player2.board.battlefield, true);
    if (result === 'gameover') {
        return gameOver(); 
    }
    if (currentGame.player1.enemyBoard.battlefield[x][y] !== 'X') {
        disablePlayer2Board();
        currentGame.currentPlayer = currentGame.currentPlayer === currentGame.player2 ? currentGame.player1 : currentGame.player2;
    }
    showTurnMessage();
    if (!currentGame.isOver) {
        activeTimeoutId = setTimeout(() => playTurn(currentGame), 3000);
    }
}

function startGame() {
    currentGame = initializeGame(player1NameInput.value);
    drawBoard(player1Board, currentGame.player1.board.battlefield, false);
    drawBoard(player2Board, currentGame.player2.board.battlefield, true);
    showTurnMessage();
    if (!currentGame.currentPlayer.isHuman) {
        disablePlayer2Board();
        setTimeout(() => playTurn(currentGame), 2000);
    } else {
        playTurn(currentGame);
    }
    drawShips();
    gameScreen.style.display = 'block';
    startScreen.style.display = 'none';
    restartButton.style.display = 'block';
    player1Name.textContent = player1NameInput.value;
}

export function drawAll(game) {
    drawBoard(player1Board, currentGame.player1.board.battlefield, false);
    drawBoard(player2Board, currentGame.player2.board.battlefield, true);
    drawShips();
    showTurnMessage();
}

function showTurnMessage() {
    turnMessage.textContent = `${currentGame.currentPlayer.name} is attacking`;
}

function drawBoard(playerBoard, battlefield = '', isClickable= false) {
    playerBoard.textContent = '';
    if (isClickable) { enablePlayer2Board();}
        
    for (let i = 0; i <= 9; i++) {
    const row = document.createElement('div');
        for (let j = 0; j <= 9; j++) {
            const cell = document.createElement('div');   
            if (isClickable) {             
                cell.dataset.x = i;
                cell.dataset.y = j;
            }
            cell.classList.add('empty');
                
            if( battlefield !=='') { 
                const current = battlefield[i][j];
                if (typeof(current) !== 'object' && current !== '-') {
                    cell.classList.remove('empty');
                    if (current === 'M' || current === 'B') {
                        cell.classList.add('miss');
                    } else {
                        cell.classList.add('hit');
                    }
                }
            }
            row.appendChild(cell)
        }
    playerBoard.appendChild(row)
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
    drawBoard(player1Board, currentGame.player1.board.battlefield, false);
    drawBoard(player2Board, currentGame.player2.board.battlefield, true);
    drawShips();
    currentGame.isOver = true;
    disablePlayer2Board();
    turnMessage.classList.add('gameover');
    turnMessage.textContent = `Game Over. ${currentGame.currentPlayer.name} wins`;
    return
}

function resetGame() {
    turnMessage.classList.remove('gameover'); 
    turnMessage.textContent = 'Enter your name and press Start button to play';
    drawBoard(player1Board);
    drawBoard(player2Board);
    currentGame = null;
    player1NameInput.value = '';
    disablePlayer2Board();
    clearTimeout(activeTimeoutId);
    activeTimeoutId = null;
    gameScreen.style.display = 'none';
    startScreen.style.display = 'block';
    restartButton.style.display = 'none';
    player1NameInput.classList.remove("error");
} 

function disablePlayer2Board() {
    player2Board.classList.add('disabled');
}
function enablePlayer2Board() {
    player2Board.classList.remove('disabled');
}

drawBoard(player1Board);
drawBoard(player2Board);
