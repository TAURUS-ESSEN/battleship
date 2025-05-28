'use strict';
import { initializeGame, startGame } from "./index.js";

const player1NameInput = document.getElementById('player1NameInput');
export const createPlayerAndStart = document.getElementById('player1ChangeNameButton');
const player1Board = document.getElementById('player1Board');
const player2Board = document.getElementById('player2Board');
const turn = document.getElementById('turn')

let currentGame = null;

createPlayerAndStart.addEventListener('click', () => {
    turn.classList.remove('gameover');
    if (player1NameInput.value !=='') {
        currentGame = initializeGame(player1NameInput.value);
        drawPlayer1Board(currentGame.player1.board.battlefield)
        drawPlayer2Board(currentGame.player2.board.battlefield)
        currentPlayerName(currentGame.currentPlayer.name)
        startGame(currentGame);
        drawShips() 
        // player1NameInput.disabled = true;
    }  
})

player2Board.addEventListener("click", (event) => {
    let x = event.target.dataset.x;
    let y = event.target.dataset.y
    currentGame.player1.attack([x,y])
    drawPlayer2Board(currentGame.player1.enemyBoard.battlefield)
    if (currentGame.player1.enemyBoard.battlefield[x][y] !== 'X') {
        player2Board.classList.add('disabled');
        currentGame.currentPlayer = currentGame.currentPlayer === currentGame.player2 ? currentGame.player1 : currentGame.player2;
    }
    currentPlayerName(currentGame.currentPlayer.name);
    if (!currentGame.isOver) {
    setTimeout(() => startGame(currentGame), 3000);
}
})

drawPlayer1Board();
drawPlayer2Board();

export function drawAll(game) {
    drawPlayer1Board(game.player1.board.battlefield)
    drawPlayer2Board(game.player2.board.battlefield)
    drawShips();
    currentPlayerName();
}

export function currentPlayerName() {
    turn.textContent = `${currentGame.currentPlayer.name} is attacking`;
}

export function playMiss() {
    const soundMiss = new Audio('./audio/miss.mp3');
    soundMiss.play();
}

export function playHit() {
    const soundHit = new Audio('./audio/hit.mp3');
    soundHit.play();
}

export function playSunk() {    
    const soundHit = new Audio('./audio/sunk.mp3');
    soundHit.play();
}

export function drawPlayer1Board(battlefield = '') {
    player1Board.textContent = '';
    for (let i = 0; i<=9; i++) {
        let string = document.createElement('div');
            for (let j=0; j<=9; j++) {
                let cell = document.createElement('div');
                cell.classList.add('empty');
                if( battlefield !=='')
                { 
                    if (typeof(battlefield[i][j]) === 'object') {
                        if (battlefield[i][j].type === 'submarine') {
                            cell.classList.remove('empty');
                        }   
                    } 
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

export function drawPlayer2Board(battlefield = '') {
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
                        cell.textContent = '' 
                    }
                }
                string.appendChild(cell)
            }
        player2Board.appendChild(string)
    }
}

export function drawShips() {
    const fleet = currentGame.player1.board.fleet;
    for (let i=0; i<fleet.length;i++) {
        const [x,y] = fleet[i].coordinates[0];
        // console.log(fleet[i].coordinates)
        // console.log('x=',x,'y=',y)
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
    turn.classList.add('gameover');
    turn.textContent = `Game Over. ${currentGame.currentPlayer.name} win`;
    return
}