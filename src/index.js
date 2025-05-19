'use strict';
import {Ship} from './ship.js';
import {Gameboard} from './gameboard.js';

export const linkor = new Ship("linkor",4);
// export const crusader1 = new Ship("crusader1",3);
// export const crusader2 = new Ship("crusader2",3);
// export const submarine = new Ship("submarine",2);
// export const minesweeper1 = new Ship("minesweeper1",1);
// export const minesweeper2 = new Ship("minesweeper2",1);
export const fleet = [linkor];
// export const fleet = [linkor, crusader1, crusader2, submarine, minesweeper1, minesweeper2];
const player1Board = new Gameboard("player1GameBoard");
const player2Board = new Gameboard("player2GameBoard");
console.log(player1Board.placeShips(fleet));
        // console.log(direction)

// console.log(player1Board.battlefield[1])