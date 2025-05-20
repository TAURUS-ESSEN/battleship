import { Ship } from '../ship.js';
import { Gameboard } from '../gameboard.js';

test('ship takes a hit', () => {
  const ship = new Ship('crusader', 3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('ship is sunk at 3 hits', () => {
  const ship = new Ship('crusader', 3);
  ship.hits = 3;
  expect(ship.isSunk()).toBe(true);
});

test('ship is not sunk at 2 hits', () => {
  const ship = new Ship('crusader', 3);
  ship.hits = 2;
  expect(ship.isSunk()).toBe(false);
});

test('cannot hit more than ship length', () => {
  const ship = new Ship('crusader', 3);
  ship.hit();
  ship.hit();
  ship.hit();

  expect(() => ship.hit()).toThrow("Ship has already been sunk.");
});

test('ship recieve Attack', () => {
  const gameboard3 = new Gameboard('test');
  gameboard3.battlefield[4][5] = '0';
  expect(gameboard3.receiveAttack(4, 5)).toBe('X');
});

test('ship NOT recieve Attack', () => {
  const gameboard3 = new Gameboard('test');
  gameboard3.battlefield[4][5] = '0';
  expect(gameboard3.receiveAttack(6, 5)).toBe('M');
});


test('check gamover', () => {
  const gameboard3 = new Gameboard('test2');
  gameboard3.battlefield[4][5] = '0';
  gameboard3.battlefield[4][6] = '0';
  gameboard3.battlefield[4][7] = '0';
  expect(gameboard3.checkGameOver()).toBe('no');
});

test('check gamover2', () => {
  const gameboard3 = new Gameboard('test2');
  gameboard3.battlefield[4][5] = '0';
  gameboard3.battlefield[4][6] = '0';
  gameboard3.battlefield[4][7] = '0';
  gameboard3.receiveAttack(4, 5)
  gameboard3.receiveAttack(4, 6)
  gameboard3.receiveAttack(4, 7)
  expect(gameboard3.checkGameOver()).toBe('gameover');
});