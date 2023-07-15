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

  get isAI() {
    return this._isAI;
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
      enemy.board.receiveAttack([x, y]);
    }

    if (this._isAI && x === undefined && y === undefined) {
      let row;
      let column;
      let legalMove = false;
      const potentialMoves = this._potentialMoves;

      if (potentialMoves.length > 0) {
        while (!legalMove) {
          const coord = potentialMoves.shift();
          [row, column] = coord;
          legalMove = enemy.board.receiveAttack([row, column]);
        }
      } else {
        while (!legalMove && potentialMoves.length === 0) {
          row = this.getRandomAICoord();
          column = this.getRandomAICoord();
          legalMove = enemy.board.receiveAttack([row, column]);
        }
      }
      const outcome = this.getHitOutcome(enemy);

      if (outcome.includes('has been sunk') && legalMove === 'hit') {
        potentialMoves.splice(0, potentialMoves.length);
      } else if (legalMove === 'hit') {
        this.updatePotentialMoves(row, column, potentialMoves);
      }
      return outcome;
    }
    return this.getHitOutcome(enemy);
  }

  getHitOutcome(enemy) {
    let hitOutcome = '';
    const { hitShipsNames } = enemy.board;
    const { sunkShipsNames } = enemy.board;

    if (hitShipsNames.length > 0) {
      hitOutcome = enemy.isAI ? `You have hit ${enemy.name.toLowerCase()}'s ${hitShipsNames.shift()}!`
        : `Your ${hitShipsNames.shift()} has been hit!`;
    } else if (sunkShipsNames.length > 0) {
      hitOutcome = enemy.isAI ? `You have sunk ${enemy.name.toLowerCase()}'s ${sunkShipsNames.shift()}!`
        : `Your ${sunkShipsNames.shift()} has been sunk!`;
    } else {
      hitOutcome = enemy.isAI ? 'You missed!' : 'Computer missed!';
    }

    return hitOutcome;
  }

  updatePotentialMoves(row, column, potentialMoves) {
    const adjacentMoves = [
      [row - 1, column],
      [row, column - 1],
      [row + 1, column],
      [row, column + 1],
    ];

    for (let i = 0; i < adjacentMoves.length; i++) {
      const [adjRow, adjColumn] = adjacentMoves[i];
      if (adjRow >= 0 && adjRow <= 9 && adjColumn >= 0 && adjColumn <= 9) {
        potentialMoves.push(adjacentMoves[i]);
      }
    }
  }
}
