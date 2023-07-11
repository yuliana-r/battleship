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

  placeShip(startIndex, ship, axis) {
    const row = startIndex[0]; // [6]
    const column = startIndex[1]; // [4]
    const board = this._board;

    if (board[row][column] !== 0) return;

    if (axis === 'x') { // horizontal
      if (column + ship.length > 10) return;
      // to refactor later
      for (let i = 0; i < ship.length; i++) {
        if (board[row][column + i] !== 0) return;
      }
      for (let i = 0; i < ship.length; i++) {
        board[row][column + i] = ship;
      }
    } else {
      if (row + ship.length > 10) return;
      // to refactor later
      for (let i = 0; i < ship.length; i++) {
        if (board[row + i][column] !== 0) return;
      }
      for (let i = 0; i < ship.length; i++) {
        board[row + i][column] = ship;
      }
    }
  }

  receiveAttack(coordinates) {
    const board = this._board;
    const row = coordinates[0];
    const column = coordinates[1];

    if (row > 9 || column > 9 || board[row][column] === 'miss'
    || board[row][column] === 'hit') return;

    if (board[row][column] === 0) {
      // record the missed shot for styling purposes?
      board[row][column] = 'miss';
    } else {
      board[row][column].hit();
      this.updateSunkShipCounter(board[row][column]);
      board[row][column] = 'hit';
    }

    // if (board[row][column] !== 0 && board[row][column] !== 'miss'
    // && !board[row][column].isSunk()) {
    //   board[row][column].hit();
    //   board[row][column] = 'hit';
    // }
  }
}
