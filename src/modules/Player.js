/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import Ship from './Ship';
import Gameboard from './Gameboard';

export default class Player {
  constructor(isAI) {
    this._name = isAI ? 'Computer' : 'You';
    this._isAI = isAI;
    this._board = new Gameboard();
    this._potentialMoves = [];
  }

  get name() {
    return this._name;
  }

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
      gameboard.placeShip([2, 0], carrier, 'y');
      gameboard.placeShip([8, 2], battleship, 'x');
      gameboard.placeShip([6, 4], destroyer, 'x');
      gameboard.placeShip([1, 4], submarine, 'y');
      gameboard.placeShip([2, 7], cruiser, 'y');
    }

    return gameboard;
  }

  sendAttack(enemy, x, y) {
    if (x !== undefined && y !== undefined) {
      // player attacks by clicks
    }

    if (this._isAI && x === undefined && y === undefined) {
      let row;
      let column;
      let legalMove = false;
      let hitOutcome = '';
      const potentialMoves = this._potentialMoves;

      if (potentialMoves.length > 0) {
        const coord = potentialMoves[0];
        [row, column] = coord;
        legalMove = enemy.board.receiveAttack([row, column]);
        potentialMoves.shift();
      } else {
        while (legalMove !== 'miss' && legalMove !== 'hit' && potentialMoves.length === 0) {
          row = this.getRandomAICoord();
          column = this.getRandomAICoord();
          legalMove = enemy.board.receiveAttack([row, column]);
        }
      }

      if (legalMove === 'hit') {
        if (row - 1 >= 0) {
          potentialMoves.push([row - 1, column]);
        }

        if (column - 1 >= 0) {
          potentialMoves.push([row, column - 1]);
        }

        if (row + 1 <= 9) {
          potentialMoves.push([row + 1, column]);
        }

        if (column + 1 <= 9) {
          potentialMoves.push([row, column + 1]);
        }
      }

      if (enemy.board.hitShipsNames.length > 0) {
        const ship = enemy.board.hitShipsNames[0];
        enemy.board.hitShipsNames.splice(0, 1);
        hitOutcome = `Your ${ship} has been hit!`;
      } else if (enemy.board.sunkShipsNames.length > 0) {
        const ship = enemy.board.sunkShipsNames[0];
        enemy.board.sunkShipsNames.splice(0, 1);
        hitOutcome = `Your ${ship} has been sunk!`;
      } else {
        hitOutcome = 'Missed!';
      }

      console.log(hitOutcome);
      return hitOutcome;
    }
  }
}
