import UI from './modules/UI';
import Game from './modules/Game-Controller';
import './styles/style.css';

function initializeGame() {
  const game = new Game();
  const info = document.getElementById('info');
  const player = game.playerOne;
  const AI = game.playerTwo;

  UI.renderGameboard(player);
  UI.renderGameboard(AI);
  game.startGame();

  UI.updateBoard(AI);
  UI.updateBoard(player);

  const computerCells = document.querySelectorAll('#player-two div');

  computerCells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      const row = e.target.getAttribute('data-cell-x');
      const column = e.target.getAttribute('data-cell-y');
      info.innerText = player.sendAttack(AI, row, column);
      UI.updateBoard(AI);

      setTimeout(() => {
        info.innerText = (AI.sendAttack(player));
        UI.updateBoard(player);
      }, 1200);
    });
  });
}

initializeGame();
