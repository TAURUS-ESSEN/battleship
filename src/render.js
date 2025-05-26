'use strict';
import { initializeGame, startGame } from "./index.js";

const player1NameInput = document.getElementById('player1NameInput');
export const createPlayerAndStart = document.getElementById('player1ChangeNameButton');
const player1Board = document.getElementById('player1Board');
const player2Board = document.getElementById('player2Board');
const resultsArea = document.getElementById('result');
const turn = document.getElementById('turn')
// const soundMiss = new Audio('./audio/miss.mp3');
// const soundHit = new Audio('./audio/hit.mp3');

let currentGame = null;

createPlayerAndStart.addEventListener('click', () => {
    if (player1NameInput.value !=='') {
        currentGame = initializeGame(player1NameInput.value);
        // resultsArea.textContent = currentGame.player1.board.battlefield;
        drawPlayer1Board(currentGame.player1.board.battlefield)
        drawPlayer2Board(currentGame.player2.board.battlefield)
        currentPlayerName(currentGame.currentPlayer.name)
        startGame(currentGame);
    }  
})

player2Board.addEventListener("click", (event) => {
    console.log(event.target)
    console.log(event.target.dataset.x, event.target.dataset.y)
    let x = event.target.dataset.x;
    let y = event.target.dataset.y
    currentGame.player1.attack([x,y])
    drawPlayer2Board(currentGame.player1.enemyBoard.battlefield)
    if (currentGame.player1.enemyBoard.battlefield[x][y] !== 'X') {
        player2Board.classList.add('disabled');
        // playMiss() 
        currentGame.currentPlayer = currentGame.currentPlayer === currentGame.player2 ? currentGame.player1 : currentGame.player2;
    }
    else {
        // playHit();
    }
    currentPlayerName(currentGame.currentPlayer.name);
    setTimeout (() =>startGame(currentGame), 3000)
    
})

drawPlayer1Board();
drawPlayer2Board();

export function currentPlayerName(name) {
    turn.textContent = currentGame.currentPlayer.name + ' turn';
}

// export function playMiss() {
//     soundMiss.play();
// }
// export function playHit() {
//     soundHit.play();
// }

export function playMiss() {
    const soundMiss = new Audio('./audio/miss.mp3');
    soundMiss.play();
}

export function playHit() {
    const soundHit = new Audio('./audio/hit.mp3');
    soundHit.play();
}

export function drawPlayer1Board(battlefield = '') {
    player1Board.textContent = '';
    for (let i = 0; i<=9; i++) {
        let string = document.createElement('div');
            for (let j=0; j<=9; j++) {
                let cell = document.createElement('div');
                if( battlefield !=='')
                { 
                    if (typeof(battlefield[i][j]) === 'object') {
                        cell.textContent = 'SHIP'    
                    } else {
                        cell.textContent = battlefield[i][j]; 
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
                        if ((battlefield[i][j] === 'M') && (battlefield[i][j] === 'B')) {
                            cell.classList.add('miss');
                        }
                        else {
                            cell.classList.add('hit');
                        }
                        cell.textContent = battlefield[i][j];    


                    } else {
                        cell.textContent = '' 
                    }
                }
                string.appendChild(cell)
            }
        player2Board.appendChild(string)
    }
}
