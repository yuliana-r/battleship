/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
export default class Gameboard {
  static width = 10;

  static height = 10;

  constructor(playerName) { // player, computer
    this.playerName = playerName;
    this._board = Array(Gameboard.height).fill(0).map(() => Array(Gameboard.width).fill(0));
  }

  get board() {
    return this._board;
  }

  placeShip(startIndex, shipLength, shipName, axis) {
    const row = startIndex[0]; // [6]
    const column = startIndex[1]; // [4]
    const board = this._board;

    if (axis === 'x') { // horizontal
      if (column + shipLength > 10) return;
      for (let i = 0; i < shipLength; i++) {
        board[row][column + i] = shipName;
      }
    } else {
      if (row + shipLength > 10) return;
      for (let i = 0; i < shipLength; i++) {
        board[row + i][column] = shipName;
      }
    }
  }
}
