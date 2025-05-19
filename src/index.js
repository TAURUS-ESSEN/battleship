'use strict';
import {Ship} from './ship.js';
import {Gameboard} from './gameboard.js';

export const linkor = new Ship("linkor",4);
export const crusader1 = new Ship("crusader1",3);
export const crusader2 = new Ship("crusader2",3);
export const submarine = new Ship("submarine",2);
export const minesweeper1 = new Ship("minesweeper1",1);
export const minesweeper2 = new Ship("minesweeper2",1);
// export const fleet = [linkor, crusader1, crusader2];
export const fleet = [linkor, crusader1, crusader2, submarine, minesweeper1, minesweeper2];
const player1Board = new Gameboard("player1GameBoard");
const player2Board = new Gameboard("player2GameBoard");
player1Board.placeShips(fleet);
        // console.log(direction)

// console.log(player1Board.battlefield[1])
// console.log([0,1,2,3,4,5,6,7,8])
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