import Gameboard from '../Gameboard';
import Ship from '../Ship';

test('places correct ship horizontally', () => {
  const testBoard = new Gameboard();
  const submarine = new Ship('submarine', 3);
  testBoard.placeShip([6, 4], submarine, 'x');
  expect(testBoard.board).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, submarine, submarine, submarine, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('places correct ship vertically', () => {
  const testBoard = new Gameboard();
  const carrier = new Ship('carrier', 5);
  testBoard.placeShip([2, 1], carrier, 'y');
  expect(testBoard.board).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, carrier, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, carrier, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, carrier, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, carrier, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, carrier, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('does not place out of bounds ship horizontally', () => {
  const testBoard = new Gameboard();
  const carrier = new Ship('carrier', 5);
  testBoard.placeShip([8, 1], carrier, 'y');
  expect(testBoard.board).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('does not place out of bounds ship vertically', () => {
  const testBoard = new Gameboard();
  const carrier = new Ship('carrier', 5);
  testBoard.placeShip([8, 6], carrier, 'x');
  expect(testBoard.board).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('does not place ship if index is taken', () => {
  const testBoard = new Gameboard();
  const submarine = new Ship('submarine', 3);
  const cruiser = new Ship('cruiser', 2);
  testBoard.placeShip([6, 4], submarine, 'x');
  testBoard.placeShip([6, 4], cruiser, 'y');
  expect(testBoard.board).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, submarine, submarine, submarine, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('does not place ship if it overlaps another ship', () => {
  const testBoard = new Gameboard();
  const submarine = new Ship('submarine', 3);
  const battleship = new Ship('battleship', 4);
  testBoard.placeShip([6, 4], submarine, 'x');
  testBoard.placeShip([5, 4], battleship, 'y');
  expect(testBoard.board).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, submarine, submarine, submarine, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('records missed attack correctly', () => {
  const testBoard = new Gameboard();
  const submarine = new Ship('submarine', 3);
  testBoard.placeShip([6, 4], submarine, 'x');
  testBoard.receiveAttack([3, 3]);
  testBoard.receiveAttack([8, 9]);
  testBoard.receiveAttack([8, 9]);
  expect(testBoard.board).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 'miss', 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, submarine, submarine, submarine, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 'miss'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('does not record out of bounds attacks', () => {
  const testBoard = new Gameboard();
  const submarine = new Ship('submarine', 3);
  testBoard.placeShip([6, 4], submarine, 'x');
  testBoard.receiveAttack([10, 3]);
  testBoard.receiveAttack([1, 20]);
  testBoard.receiveAttack([10, 10]);
  expect(testBoard.board).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, submarine, submarine, submarine, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('records correct ship attack', () => {
  const testBoard = new Gameboard();
  const submarine = new Ship('submarine', 3);
  testBoard.placeShip([6, 4], submarine, 'x');
  testBoard.receiveAttack([6, 4]);
  expect(testBoard.board).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'hit', submarine, submarine, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('sends hit() to correct ship', () => {
  const testBoard = new Gameboard();
  const submarine = new Ship('submarine', 3);
  testBoard.placeShip([6, 4], submarine, 'x');
  testBoard.receiveAttack([6, 4]);
  expect(submarine.hitsNum).toStrictEqual(1);
});

test('records sunk ship correctly', () => {
  const testBoard = new Gameboard();
  const submarine = new Ship('submarine', 3);
  testBoard.placeShip([6, 4], submarine, 'x');
  testBoard.receiveAttack([6, 4]);
  testBoard.receiveAttack([6, 5]);
  testBoard.receiveAttack([6, 6]);
  expect(submarine.isSunk()).toBe(true);
});

test('returns false if not all ships have been sunk', () => {
  const testBoard = new Gameboard();
  const submarine = new Ship('submarine', 3);
  testBoard.placeShip([6, 4], submarine, 'x');
  testBoard.receiveAttack([6, 4]);
  testBoard.receiveAttack([6, 5]);
  testBoard.receiveAttack([6, 6]);
  expect(testBoard.allShipsSunkCheck()).toBe(false);
});

test('returns correct number of remaining ships', () => {
  const testBoard = new Gameboard();
  const submarine = new Ship('submarine', 3);
  testBoard.placeShip([6, 4], submarine, 'x');
  testBoard.receiveAttack([6, 4]);
  testBoard.receiveAttack([6, 5]);
  testBoard.receiveAttack([6, 6]);
  expect(testBoard.remainingShips()).toBe(4);
});

test('returns true if all ships have been sunk', () => {
  const testBoard = new Gameboard();
  const carrier = new Ship('carrier', 5);
  const battleship = new Ship('battleship', 4);
  const destroyer = new Ship('destroyer', 3);
  const submarine = new Ship('submarine', 3);
  const cruiser = new Ship('cruiser', 2);
  testBoard.placeShip([2, 1], carrier, 'y');
  testBoard.placeShip([8, 2], battleship, 'x');
  testBoard.placeShip([1, 4], destroyer, 'y');
  testBoard.placeShip([6, 4], submarine, 'x');
  testBoard.placeShip([2, 7], cruiser, 'y');

  testBoard.receiveAttack([2, 1]);
  testBoard.receiveAttack([3, 1]);
  testBoard.receiveAttack([4, 1]);
  testBoard.receiveAttack([5, 1]);
  testBoard.receiveAttack([6, 1]);

  testBoard.receiveAttack([8, 2]);
  testBoard.receiveAttack([8, 3]);
  testBoard.receiveAttack([8, 4]);
  testBoard.receiveAttack([8, 5]);

  testBoard.receiveAttack([1, 4]);
  testBoard.receiveAttack([2, 4]);
  testBoard.receiveAttack([3, 4]);

  testBoard.receiveAttack([6, 4]);
  testBoard.receiveAttack([6, 5]);
  testBoard.receiveAttack([6, 6]);

  testBoard.receiveAttack([2, 7]);
  testBoard.receiveAttack([3, 7]);

  expect(testBoard.allShipsSunkCheck()).toBe(true);
});
