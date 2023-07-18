/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
export default class Gameboard {
  static height = 10;

  static width = 10;

  constructor() {
    this._board = Array(Gameboard.height).fill().map(() => Array(Gameboard.width).fill(0));
    this._sunkShips = 0;
    this._sunkShipsNames = [];
    this._hitShipsNames = [];
  }

  get board() {
    return this._board;
  }

  get sunkShips() {
    return this._sunkShips;
  }

  get sunkShipsNames() {
    return this._sunkShipsNames;
  }

  get hitShipsNames() {
    return this._hitShipsNames;
  }

  allShipsSunkCheck() {
    return this.sunkShips === 5;
  }

  updateSunkShipCounter(ship) {
    if (ship.isSunk()) {
      this._sunkShips++;
    }
  }

  remainingShips() {
    return 5 - this.sunkShips;
  }

  placeShip(startIndex, ship, axis) {
    const row = startIndex[0]; // [6]
    const column = startIndex[1]; // [4]
    const board = this._board;

    if (board[row][column] !== 0) return false;

    if (axis === 'x') {
      if (column + ship.length > 10) return false;

      for (let i = 0; i < ship.length; i++) {
        if (board[row][column + i] !== 0) return false;
      }
      for (let i = 0; i < ship.length; i++) {
        board[row][column + i] = ship;
      }
      return true;
    }
    if (row + ship.length > 10) return false;

    for (let i = 0; i < ship.length; i++) {
      if (board[row + i][column] !== 0) return false;
    }
    for (let i = 0; i < ship.length; i++) {
      board[row + i][column] = ship;
    }
    return true;
  }

  checkAllShipsPlaced() {
    const board = this._board;
    let emptySlots = 0;

    board.forEach((row) => {
      row.forEach((slot) => {
        if (slot === 0) { emptySlots++; }
      });
    });

    return emptySlots === 83;
  }

  receiveAttack(coordinates) {
    const board = this._board;
    const row = coordinates[0];
    const column = coordinates[1];

    if (board[row][column] === 'miss') return false;
    if (board[row][column] === 'hit') return false;
    if (row > 9 || column > 9) return false;

    if (board[row][column] === 0) {
      board[row][column] = 'miss';
      return 'miss';
    }
    board[row][column].hit();

    if (board[row][column].isSunk()) {
      this._sunkShipsNames.push(board[row][column].name);
    } else {
      this._hitShipsNames.push(board[row][column].name);
    }

    this.updateSunkShipCounter(board[row][column]);
    board[row][column] = 'hit';
    return 'hit';
  }

  clearBoard() {
    this._board = Array(Gameboard.height).fill().map(() => Array(Gameboard.width).fill(0));
  }
}
