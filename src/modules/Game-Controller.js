/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import Player from './Player';
// import UI from './UI';

export default class Game {
  constructor() {
    this._playerOne = new Player(false);
    this._playerTwo = new Player(true);
    this._currentPlayer = this._playerOne;
    this._opponent = this._playerTwo;
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

  get opponent() {
    return this._opponent;
  }

  // set currentPlayer(player) {
  //   this._currentPlayer = player;
  // }

  startGame() {
    this._playerOne.placeShips();
    this._playerTwo.placeShips();
  }

  switchPlayer() {
    if (this._currentPlayer === this._playerOne) {
      this._currentPlayer = this._playerTwo;
      this._opponent = this._playerOne;
    } else {
      this._currentPlayer = this._playerOne;
      this._opponent = this._playerTwo;
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
      winner = this._playerTwo.name;
    } else if (this._playerTwo.board.allShipsSunkCheck()) {
      winner = this._playerOne.name;
    }
    return winner;
  }
}
