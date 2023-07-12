/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
export default class Gameboard {
  static height = 10;

  static width = 10;

  constructor() { // player, computer
    // this.playerName = playerName;
    this._board = Array(Gameboard.height).fill().map(() => Array(Gameboard.width).fill(0));
    this._sunkShips = 0;
  }

  get board() {
    return this._board;
  }

  get sunkShips() {
    return this._sunkShips;
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

    if (row > 9 || column > 9 || board[row][column] === 'miss'
    || board[row][column] === 'hit') return false;

    if (board[row][column] === 0) {
      // record the missed shot for styling purposes?
      board[row][column] = 'miss';
      return 'miss';
    }
    board[row][column].hit();
    // check if sunk to display message for user
    // console.log(`is ${board[row][column].name} sunk? ${board[row][column].isSunk()}`);

    // if (board[row][column].isSunk()) {
    //   return `${board[row][column]} has been sunk!`;
    // }

    this.updateSunkShipCounter(board[row][column]);
    board[row][column] = 'hit';
    return 'hit';
  }
}
