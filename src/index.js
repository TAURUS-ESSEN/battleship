'use strict';
import {Ship} from './ship.js';
import {Gameboard} from './gameboard.js';
import {Player} from './player.js';
import {drawAll, gameOver} from './render.js';

function createFleet() {
    return [
        new Ship("linkor", 4),
        new Ship("crusader1", 3),
        new Ship("crusader2", 3),
        new Ship("submarine1", 2),
        new Ship("submarine2", 2),
        new Ship("mine1", 1),
        new Ship("mine2", 1),
    ];
}

export function initializeGame(player1Name) {
    const fleet1 = createFleet();
    const fleet2 = createFleet();
    const player1Board = new Gameboard("player1GameBoard");
    const player2Board = new Gameboard("player2GameBoard");
    player1Board.placeShips(fleet1);
    player2Board.placeShips(fleet2);
    const player1 = new Player(player1Name, player1Board, player2Board, true);
    const player2 = new Player('Captain Jack', player2Board, player1Board, false);
    const game = { currentPlayer: null, player1, player2,  isOver: false}
    return whoIsFirst(game);
}

function whoIsFirst(game) {
    let firstTurn = Math.floor(Math.random()*2+1);
    game.currentPlayer = firstTurn === 1 ? game.player1 : game.player2;
    return game;
}

export function playTurn(game) {
    if (game.isOver) return;
    drawAll(game);
    if (game.currentPlayer.isHuman === true) {
        if (game.currentPlayer.enemyBoard.checkGameOver() === 'gameover') {
            return gameOver() 
        } 
    return 
    } else {
        computerTurn(game);
    }
}

function computerTurn(game) {
    let attackResult = '';
    let attackPoint = null;
    if (game.currentPlayer.enemyWounded === true) {
        attackResult = game.currentPlayer.killWounded();
    } else {
        attackPoint = checkEnemyField(game.currentPlayer);
        attackResult = game.currentPlayer.attack(attackPoint);
    }
    if (attackResult === 'gameover') {
        return gameOver();
    }
    if (attackResult === 'X') {
        if ((game.currentPlayer.enemyWounded === false) && (game.currentPlayer.targetIsSunk === false)) { 
            game.currentPlayer.addTarget(attackPoint);
        }
        return setTimeout(() => playTurn(game),2500); 
    }
    game.currentPlayer = game.currentPlayer === game.player2 ? game.player1 : game.player2; // смена игрока. 
    // draw(game) // вспомогательный код. рисует доску.
    return playTurn(game);
}

function checkEnemyField(currentPlayer) {
    let x = Math.floor(Math.random()*10);
    if (!currentPlayer.enemyBoard.battlefield[x].some(value => (value !== 'X') && (value !=='M') && (value !== 'B'))) {
        return checkEnemyField(currentPlayer)
    }
    let y = Math.floor(Math.random()*10);
    if ((currentPlayer.enemyBoard.battlefield[x][y]==='X') || (currentPlayer.enemyBoard.battlefield[x][y]==='M') || (currentPlayer.enemyBoard.battlefield[x][y]==='B')) {
        return checkEnemyField(currentPlayer)
    }
    return [x,y]
}

function draw(game) {
console.log (' EUGEN    0    1    2    3    4    5    6    7    8    9 ')
console.log('x0', game.player1.board.battlefield[0])
console.log('x1',game.player1.board.battlefield[1])
console.log('x2',game.player1.board.battlefield[2])
console.log('x3',game.player1.board.battlefield[3])
console.log('x4',game.player1.board.battlefield[4])
console.log('x5',game.player1.board.battlefield[5])
console.log('x6',game.player1.board.battlefield[6])
console.log('x7',game.player1.board.battlefield[7])
console.log('x8',game.player1.board.battlefield[8])
console.log('x9',game.player1.board.battlefield[9])


console.log (' Mister X  0    1    2    3    4    5    6    7    8    9 ')
console.log('x0', game.player2.board.battlefield[0])
console.log('x1',game.player2.board.battlefield[1])
console.log('x2',game.player2.board.battlefield[2])
console.log('x3',game.player2.board.battlefield[3])
console.log('x4',game.player2.board.battlefield[4])
console.log('x5',game.player2.board.battlefield[5])
console.log('x6',game.player2.board.battlefield[6])
console.log('x7',game.player2.board.battlefield[7])
console.log('x8',game.player2.board.battlefield[8])
console.log('x9',game.player2.board.battlefield[9])
}
