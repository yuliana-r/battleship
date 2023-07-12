/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Ship from './Ship';
import Gameboard from './Gameboard';

export default class Player {
  constructor(isAI) {
    this.name = isAI ? 'Computer' : 'You';
    this._isAI = isAI;
    this._board = new Gameboard();
  }

  // get isAI() {
  //   return this._isAI;
  // }

  get board() {
    return this._board;
  }

  getRandomAICoord() {
    return Math.floor(Math.random() * 10);
  }

  getRandomAxis() {
    const randomNum = Math.random();
    return randomNum < 0.5 ? 'x' : 'y';
  }

  placeShips() {
    const gameboard = this._board;

    const carrier = new Ship('carrier', 5);
    const battleship = new Ship('battleship', 4);
    const destroyer = new Ship('destroyer', 3);
    const submarine = new Ship('submarine', 3);
    const cruiser = new Ship('cruiser', 2);

    if (this._isAI) {
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
    } else {
      gameboard.placeShip([2, 1], carrier, 'y');
      gameboard.placeShip([8, 2], battleship, 'x');
      gameboard.placeShip([6, 4], destroyer, 'x');
      gameboard.placeShip([1, 4], submarine, 'y');
      gameboard.placeShip([2, 7], cruiser, 'y');
    }

    return gameboard;
  }

  sendAttack(enemy) {
    if (this._isAI) {
      let row;
      let column;

      let legalMove = false;
      while (legalMove !== 'miss' && legalMove !== 'hit') {
        row = this.getRandomAICoord();
        column = this.getRandomAICoord();
        legalMove = enemy.board.receiveAttack([row, column]);
      }
      if (legalMove === 'hit') {
        console.log('true');
      }
    }
  }
}
