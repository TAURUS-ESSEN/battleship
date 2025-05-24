import { Ship } from '../ship.js';
import { Gameboard } from '../gameboard.js';
import { Player } from '../player.js';

// test('ship takes a hit', () => {
//   const ship = new Ship('crusader', 3);
//   ship.hit();
//   expect(ship.hits).toBe(1);
// });

// test('ship is sunk at 3 hits', () => {
//   const ship = new Ship('crusader', 3);
//   ship.hits = 3;
//   expect(ship.isSunk()).toBe(true);
// });

// test('ship is not sunk at 2 hits', () => {
//   const ship = new Ship('crusader', 3);
//   ship.hits = 2;
//   expect(ship.isSunk()).toBe(false);
// });

// test('cannot hit more than ship length', () => {
//   const ship = new Ship('crusader', 3);
//   ship.hit();
//   ship.hit();
//   ship.hit();

//   expect(() => ship.hit()).toThrow("Ship has already been sunk.");
// });

// test('ship recieve Attack', () => {
//   const gameboard3 = new Gameboard('test');
//   gameboard3.battlefield[4][5] = '0';
//   expect(gameboard3.receiveAttack(4, 5)).toBe('X');
// });

// test('ship NOT recieve Attack', () => {
//   const gameboard3 = new Gameboard('test');
//   gameboard3.battlefield[4][5] = 'ship';
//   expect(gameboard3.receiveAttack(6, 5)).toBe('M');
// });

// test('attack enemy', () => {
//   const player1Board = new Gameboard("player1GameBoard");
//   const player2Board = new Gameboard("player2GameBoard");
//   const player1 = new Player('Eugen', player1Board, player2Board);
//   player1.attack(5,5);
//   expect(player2Board.battlefield[5][5]).toBe('M')
// })

//     test('check gamover', () => {
//       const linkor = new Ship("linkor",4);
//       const crusader1 = new Ship("crusader1",3);
//       const fleet = [linkor, crusader1];
//       const gameboard5 = new Gameboard("player5GameBoard");
//       gameboard5.placeShips(fleet);
//       expect(gameboard5.checkGameOver()).toBe(true);
//     });

//         test('check gamover#2', () => {
//       const linkor = new Ship("linkor",4);
//       const crusader1 = new Ship("crusader1",3);
//       const fleet = [linkor, crusader1];
//       fleet[0].sunk =true;
//       fleet[1].sunk =true;
//       const gameboard5 = new Gameboard("player5GameBoard");
//       gameboard5.placeShips(fleet);
//       expect(gameboard5.checkGameOver()).toBe(false);
//     });

//       test('check gamover#3', () => {
//       const linkor = new Ship("linkor",4);
//       const crusader1 = new Ship("crusader1",3);
//       const fleet = [linkor, crusader1];
//       fleet[0].sunk =true;
//       fleet[1].sunk =false;
//       const gameboard5 = new Gameboard("player5GameBoard");
//       gameboard5.placeShips(fleet);
//       expect(gameboard5.checkGameOver()).toBe(true);
//     });
 

// test('KI test#1 add wounded', () => {
//   const player1Board = new Gameboard("player1GameBoard");
//   const player2Board = new Gameboard("player2GameBoard");
//   const player1 = new Player('Eugen', player1Board, player2Board);
//   const player2 = new Player('Mister X', player2Board, player1Board);
//   player2.board.battlefield[0][1] = 'S';
//   player2.board.battlefield[0][2] = 'S';
//   player2.board.battlefield[0][3] = 'S';
//   // player1.attack([1,2]);
//   player1.targetX = 0;
//   player1.targetY = 1;
//   player1.killWounded();
//   expect(player1.woundedPossibleCoordinates.length).toBe(3)
// })

// test('KI test#1 add wounded', () => {
//   const player1Board = new Gameboard("player1GameBoard");
//   const player2Board = new Gameboard("player2GameBoard");
//   const player1 = new Player('Eugen', player1Board, player2Board);
//   const player2 = new Player('Mister X', player2Board, player1Board);
//   player2.board.battlefield[2][1] = 'S';
//   player2.board.battlefield[2][2] = 'S';
//   player2.board.battlefield[2][3] = 'S';
//   // player1.attack([1,2]);
//   player1.targetX = 2;
//   player1.targetY = 1;
//   player1.killWounded();
//   // expect(player1.woundedPossibleCoordinates.length).toBe(3)
//   // expect(player1.enemyBoard.battlefield[1][0]).toBe('B')
//   expect(player1.enemyBoard.battlefield[5][2]).toBe('B')
// })

test('KI test#1 add wounded', () => {
  const player1Board = new Gameboard("player1GameBoard");
  const player2Board = new Gameboard("player2GameBoard");
  const player1 = new Player('Eugen', player1Board, player2Board);
  const player2 = new Player('Mister X', player2Board, player1Board);
  player2.board.battlefield[2][1] = 'X';
  player2.board.battlefield[2][2] = 'S';
  player2.board.battlefield[2][3] = 'S';
  // player1.attack([1,2]);
  player1.targetX = 2;
  player1.targetY = 1;
  // player1.woundedPossibleCoordinates = [[3,1],[1,1],[2,2],[2,0]] 
  player1.killWounded();
  // expect(player1.woundedPossibleCoordinates.length).toBe(3)
  // expect(player1.enemyBoard.battlefield[1][0]).toBe('B')
  expect(player1.woundedPossibleCoordinates[0]).toBe([1,1])
})