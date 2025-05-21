'use strict';
import {Ship} from './ship.js';
import {Gameboard} from './gameboard.js';
import {Player} from './player.js';

function createFleet() {
    return [
        new Ship("linkor", 4),
        new Ship("crusader1", 3),
        new Ship("crusader2", 3),
        new Ship("submarine", 2),
        new Ship("minesweeper1", 1),
        new Ship("minesweeper2", 1),
    ];
}
const fleet1 = createFleet();
const fleet2 = createFleet();
const player1Board = new Gameboard("player1GameBoard");
const player2Board = new Gameboard("player2GameBoard");
player1Board.placeShips(fleet1);
player2Board.placeShips(fleet2);
export const player1 = new Player('Eugen', player1Board, player2Board);
export const player2 = new Player('Mister X', player2Board, player1Board);
let counter = 0;

function whoIsFirst() {
    let firstTurn = Math.floor(Math.random()*2+1);
    let currentPlayer = firstTurn === 1 ? player1 : player2;
    startGame(currentPlayer);
}

// console.log(fleet1[0].coordinates[0])
// console.log(fleet1[0].coordinates[1])
// console.log(fleet1[0].coordinates[2])
// console.log(fleet2[0].coordinates[3])
// console.log(fleet2[1].coordinates[0])
// console.log(fleet2[1].coordinates[1])
// console.log(fleet2[1].coordinates[2])
// console.log(fleet2[1].coordinates[3])

whoIsFirst();

function startGame(player) {
    let currentPlayer = player;
    console.log('player who?', currentPlayer.name)
    let attackPoint = checkEnemyField(currentPlayer);
    let result = currentPlayer.attack(attackPoint);
    console.log('result=', result)
    if (result === 'X')
        {
            console.log('повторый ход!')
            return startGame(player);
        }
    
    counter++;
    console.log(`counter=`, counter,'currentPlayer.namee',currentPlayer.name)
    currentPlayer = currentPlayer === player2 ? player1 : player2;
    draw()
    if (currentPlayer.board.checkGameOver() === 'gameover') {
        return console.log(`gameover - ${currentPlayer.name} is lose` )
    }
        return startGame(currentPlayer);
}

function checkEnemyField(currentPlayer) {
    let x = Math.floor(Math.random()*10);
    if (!currentPlayer.enemyBoard.battlefield[x].some(value => (value !== 'X') && (value !=='M') && (value !== 'B'))) {
        console.log('строка уже забита \ отстреляна');
        return checkEnemyField(currentPlayer)
    }
    let y = Math.floor(Math.random()*10);
    if ((currentPlayer.enemyBoard.battlefield[x][y]==='X') || (currentPlayer.enemyBoard.battlefield[x][y]==='M') || (currentPlayer.enemyBoard.battlefield[x][y]==='B')) {
        console.log(`ячейка ${x}${y} уже занята там стоит =`,currentPlayer.enemyBoard.battlefield[x][y])
        return checkEnemyField(currentPlayer)
    }
    let coordinate = [x,y]; 
    return coordinate
}
//   draw()
function draw() {
console.log (' EUGEN    0    1    2    3    4    5    6    7    8    9 ')
console.log('x0', player1Board.battlefield[0])
console.log('x1',player1Board.battlefield[1])
console.log('x2',player1Board.battlefield[2])
console.log('x3',player1Board.battlefield[3])
console.log('x4',player1Board.battlefield[4])
console.log('x5',player1Board.battlefield[5])
console.log('x6',player1Board.battlefield[6])
console.log('x7',player1Board.battlefield[7])
console.log('x8',player1Board.battlefield[8])
console.log('x9',player1Board.battlefield[9])


console.log (' Mister X  0    1    2    3    4    5    6    7    8    9 ')
console.log('x0', player2Board.battlefield[0])
console.log('x1',player2Board.battlefield[1])
console.log('x2',player2Board.battlefield[2])
console.log('x3',player2Board.battlefield[3])
console.log('x4',player2Board.battlefield[4])
console.log('x5',player2Board.battlefield[5])
console.log('x6',player2Board.battlefield[6])
console.log('x7',player2Board.battlefield[7])
console.log('x8',player2Board.battlefield[8])
console.log('x9',player2Board.battlefield[9])
}
