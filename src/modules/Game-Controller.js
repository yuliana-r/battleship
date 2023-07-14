/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import Player from './Player';
// import UI from './UI';

export default class Game {
  constructor() {
    this._playerOne = new Player(false);
    this._playerTwo = new Player(true);
    this._currentPlayer = this.playerOne;
  }

  get playerOne() {
    return this._playerOne;
  }

  get playerTwo() {
    return this._playerTwo;
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  startGame() {
    this._playerOne.placeShips();
    this._playerTwo.placeShips();
    if (this._playerOne.board.checkAllShipsPlaced()
    && this._playerTwo.board.checkAllShipsPlaced()) {
    //   this.currentPlayer.sendAttack(this.playerTwo);
    }
  }

  switchPlayer() {
    if (this._currentPlayer === this._playerOne) {
      this._currentPlayer = this._playerTwo;
      setTimeout(this._currentPlayer.sendAttack(this._playerOne), 3000);
    } else {
      this._currentPlayer = this._playerOne;
    }
  }

  isGameOver() {
    if (this._playerOne.board.allShipsSunkCheck() || this._playerTwo.board.allShipsSunkCheck()) {
      return true;
    }
    return false;
  }

  getWinner() {
    let winner;
    if (this._playerOne.board.allShipsSunkCheck()) {
      winner = this._playerTwo;
    } else if (this._playerTwo.board.allShipsSunkCheck()) {
      winner = this._playerOne;
    }
    return winner;
  }
}
