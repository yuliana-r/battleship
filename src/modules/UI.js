import Game from './Game-Controller';
import Player from './Player';

export default class UI {
  static renderGameboard(player) {
    const rows = 10;
    const columns = 10;
    const { board } = player.board;
    console.log(rows);
    console.log(columns);
    console.log(board);
    const playerID = player.isAI ? 'player-two' : 'player-one';
    const gameboard = document.getElementById(`${playerID}`);

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const div = document.createElement('div');
        if (!player.isAI) {
          div.setAttribute('data-cell', cell === 0 ? 'none' : 'ship');
        } else {
          div.setAttribute('data-cell', 'none');
        }

        div.setAttribute('data-cell-x', rowIndex);
        div.setAttribute('data-cell-y', columnIndex);

        gameboard.appendChild(div);
      });
    });
  }
}
