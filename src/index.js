'use strict';
import {Ship} from './ship.js';
import {Gameboard} from './gameboard.js';
import {Player} from './player.js';

export const linkor = new Ship("linkor",4);
export const crusader1 = new Ship("crusader1",3);
export const crusader2 = new Ship("crusader2",3);
export const submarine = new Ship("submarine",2);
export const minesweeper1 = new Ship("minesweeper1",1);
export const minesweeper2 = new Ship("minesweeper2",1);
export const fleet = [linkor, crusader1, crusader2, submarine, minesweeper1, minesweeper2];
const player1Board = new Gameboard("player1GameBoard");
const player2Board = new Gameboard("player2GameBoard");
player1Board.placeShips(fleet);
player2Board.placeShips(fleet);
export const player1 = new Player('Eugen', player1Board, player2Board);
export  const player2 = new Player('Mister X', player2Board, player1Board);
console.log(player1);
console.log(player2);
let counter = 0;

function whoIsFirst() {
  let firstTurn = Math.floor(Math.random()*2+1)
  let currentPlayer = firstTurn === 1 ? player1 : player2;
  console.log(`первый игрок будет ${currentPlayer}`)
  startGame(currentPlayer)
}

whoIsFirst();
// startGame();

function startGame(player) {
    let currentPlayer = player;
    console.log('player who?', currentPlayer.name)
    currentPlayer.attack(counter,4)
    counter++;
    console.log(`counter=`, counter,'currentPlayer.namee',currentPlayer.name)
    currentPlayer = currentPlayer === player2 ? player1 : player2;
    if (counter <4) {
        return startGame(currentPlayer);
    }
    return console.log('gameOver')
}


// player1Board.checkGameOver();
// console.log(player1Board.receiveAttack(5, 5))
// console.log(player1Board.receiveAttack(5, 1))
// console.log(player1Board.receiveAttack(5, 2))
// console.log(player1Board.receiveAttack(5, 3))
// console.log(player1Board.receiveAttack(5, 4))
// console.log(player1Board.receiveAttack(5, 6))
// console.log(player1Board.receiveAttack(5, 7))
// console.log(player1Board.receiveAttack(5, 8))
// console.log(player1Board.receiveAttack(5, 9))
// console.log(player1Board.receiveAttack(5, 0))

console.log ('          0    1    2    3    4    5    6    7    8    9 ')
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


console.log ('          0    1    2    3    4    5    6    7    8    9 ')
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
