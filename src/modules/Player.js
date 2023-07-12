/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Ship from './Ship';
import Gameboard from './Gameboard';
// const Gameboard = require('./Gameboard');
// const Ship = require('./Ship');

export default class Player {
  constructor(isAI) {
    this.name = isAI ? 'Computer' : 'You';
    this._isAI = isAI;
    this._board = new Gameboard();
  }

  get isAI() {
    return this._isAI;
  }

  getRandomAICoord() {
    return Math.floor(Math.random() * 10);
  }

  placeAIShips() {
    const gameboard = this._board;

    const carrier = new Ship('carrier', 5);
    const battleship = new Ship('battleship', 4);
    const destroyer = new Ship('destroyer', 3);
    const submarine = new Ship('submarine', 3);
    const cruiser = new Ship('cruiser', 2);

    const ships = [carrier, battleship, destroyer, submarine, cruiser];

    for (let i = 0; i < ships.length; i++) {
      let shipPlaced = false;
      while (!shipPlaced) {
        const axis = this.getRandomAxis();
        const row = this.getRandomAICoord();
        const column = this.getRandomAICoord();
        shipPlaced = gameboard.placeShip([row, column], ships[i], axis);
      }
    }

    return gameboard;
  }

  getRandomAxis() {
    const randomNum = Math.random();
    return randomNum < 0.5 ? 'x' : 'y';
  }
}
