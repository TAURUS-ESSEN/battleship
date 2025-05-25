'use strict';
import { initializeGame, startGame } from "./index.js";
import {  } from "./index.js";

const player1NameInput = document.getElementById('player1NameInput');
export const createPlayerAndStart = document.getElementById('player1ChangeNameButton');
const player1Board = document.getElementById('player1Board');
const player2Board = document.getElementById('player2Board');
const resultsArea = document.getElementById('result');
const turn = document.getElementById('turn')
let currentGame = null;

createPlayerAndStart.addEventListener('click', () => {
    if (player1NameInput.value !=='') {
        currentGame = initializeGame(player1NameInput.value);
        // resultsArea.textContent = currentGame.player1.board.battlefield;
        drawPlayer1Board(currentGame.player1.board.battlefield)
        drawPlayer2Board(currentGame.player2.board.battlefield)
        turn.textContent = currentGame.currentPlayer.name + ' turn';
        startGame(currentGame)
    }  
})
drawPlayer1Board();
drawPlayer2Board();

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
    player2Board.textContent = '';
    for (let i = 0; i<=9; i++) {
        let string = document.createElement('div');
            for (let j=0; j<=9; j++) {
                let cell = document.createElement('div');
                if( battlefield !=='')
                { 
                    if ((typeof(battlefield[i][j]) !== 'object') && (battlefield[i][j] !=='-')) {
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
