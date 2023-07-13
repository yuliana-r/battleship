/* eslint-disable class-methods-use-this */
import Player from './Player';

export default class Game {
  constructor() {
    this.playerOne = new Player(false);
    this.playerTwo = new Player(true);
    this.currentPlayer = this.playerOne;
  }

  startGame() {
    this.playerOne.placeShips();
    this.playerTwo.placeShips();
    this.currentPlayer.sendAttack(this.playerTwo);
  }

  switchPlayer() {
    if (this.currentPlayer === this.playerOne) {
      this.currentPlayer = this.playerTwo;
      setTimeout(this.currentPlayer.sendAttack(this.playerOne), 3000);
    } else {
      this.currentPlayer = this.playerOne;
    }
  }

  isGameOver() {
    if (this.playerOne.board.allShipsSunkCheck() || this.playerTwo.board.allShipsSunkCheck()) {
      return true;
    }
    return false;
  }

  getWinner() {
    let winner;
    if (this.playerOne.board.allShipsSunkCheck()) {
      winner = this.playerTwo;
    } else if (this.playerTwo.board.allShipsSunkCheck()) {
      winner = this.playerOne;
    }
    return winner;
  }
}
