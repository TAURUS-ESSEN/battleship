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

test('attack enemy', () => {
  const player1Board = new Gameboard("player1GameBoard");
  const player2Board = new Gameboard("player2GameBoard");
  const player1 = new Player('Eugen', player1Board, player2Board);
  player1.attack(5,5);
  expect(player2Board.battlefield[5][5]).toBe('M')
})

    test('check gamover', () => {
      const linkor = new Ship("linkor",4);
      const crusader1 = new Ship("crusader1",3);
      const fleet = [linkor, crusader1];
      const gameboard5 = new Gameboard("player5GameBoard");
      gameboard5.placeShips(fleet);
      expect(gameboard5.checkGameOver()).toBe(true);
    });

        test('check gamover#2', () => {
      const linkor = new Ship("linkor",4);
      const crusader1 = new Ship("crusader1",3);
      const fleet = [linkor, crusader1];
      fleet[0].sunk =true;
      fleet[1].sunk =true;
      const gameboard5 = new Gameboard("player5GameBoard");
      gameboard5.placeShips(fleet);
      expect(gameboard5.checkGameOver()).toBe(false);
    });

      test('check gamover#3', () => {
      const linkor = new Ship("linkor",4);
      const crusader1 = new Ship("crusader1",3);
      const fleet = [linkor, crusader1];
      fleet[0].sunk =true;
      fleet[1].sunk =false;
      const gameboard5 = new Gameboard("player5GameBoard");
      gameboard5.placeShips(fleet);
      expect(gameboard5.checkGameOver()).toBe(true);
    });
 