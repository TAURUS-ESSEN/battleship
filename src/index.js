'use strict';
import {Ship} from './ship.js';
import {Gameboard} from './gameboard.js';
import {Player} from './player.js';
// import {drawPlayer1Board, drawPlayer2Board, currentPlayerName, drawShips, gameOver} from './render.js';
import {drawAll, gameOver} from './render.js';

function createFleet() {
    return [
        new Ship("linkor", 4),
        new Ship("crusader1", 3),
        new Ship("crusader2", 3),
        new Ship("submarine", 2),
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

export function startGame(game) {
    if (game.isOver) return;
    // drawPlayer1Board(game.player1.board.battlefield)
    // drawPlayer2Board(game.player2.board.battlefield)
    // drawShips();
    // currentPlayerName();
    drawAll()
    if (game.currentPlayer.isHuman === true) {
        if (game.currentPlayer.enemyBoard.checkGameOver() === 'gameover') {
            return gameOver() 
        } 
        return // если убрать комп будет сам с собой играть
    }
    else {
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
        alert('game over')
        drawPlayer1Board(game.player1.board.battlefield);
        drawPlayer2Board(game.player2.board.battlefield);
        return gameOver();
    }
    if (attackResult === 'X') {
            // console.log('повторый ход!')
        if ((game.currentPlayer.enemyWounded === false) && (game.currentPlayer.targetIsSunk === false)) { 
            game.currentPlayer.addTarget(attackPoint);
        }
        startGame(game)
    }
    game.currentPlayer = game.currentPlayer === game.player2 ? game.player1 : game.player2; // смена игрока. 
    console.log(`Произошла смена игрока на ${game.currentPlayer.name}`)
    draw(game) // вспомогательный код. рисует доску.
    return startGame(game);
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
    let coordinate = [x,y]; 
    return coordinate
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
