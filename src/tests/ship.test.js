import { Ship } from '../ship.js';

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
