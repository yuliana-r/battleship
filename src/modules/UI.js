import Game from './Game-Controller';
import Player from './Player';

export default class UI {
  static renderGameboard(player) {
    const { board } = player.board;
    const playerID = player.isAI ? 'player-two' : 'player-one';
    const gameboard = document.getElementById(`${playerID}`);

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const div = document.createElement('div');
        div.setAttribute('data-cell-x', rowIndex);
        div.setAttribute('data-cell-y', columnIndex);

        gameboard.appendChild(div);
      });
    });
  }

  static updateBoard(player) {
    const { board } = player.board;
    const playerID = player.isAI ? 'player-two' : 'player-one';
    const gameboard = document.getElementById(`${playerID}`);
    const cells = gameboard.getElementsByTagName('div');

    Array.from(cells).forEach((cell, index) => {
      const row = Math.floor(index / 10);
      const col = index % 10;
      const cellValue = board[row][col];

      if (!player.isAI) {
        cell.setAttribute('data-cell', cellValue === 0 ? 'none' : 'ship');
      } else {
        cell.setAttribute('data-cell', 'none');
      }

      if (cellValue === 'hit') {
        cell.setAttribute('data-cell', 'hit');
      }

      if (cellValue === 'miss') {
        cell.setAttribute('data-cell', 'miss');
      }
    });
  }
}
