import Player from './modules/Player';
import UI from './modules/UI';
import './styles/style.css';

const info = document.getElementById('info');

const ai = new Player(true);
const player = new Player(false);

// console.log(ai.placeShips());

// console.log(player.board);

UI.renderGameboard(player);
UI.renderGameboard(ai);
ai.placeShips();
player.placeShips();
// info.innerText = ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
UI.updateBoard(ai);
UI.updateBoard(player);

const computerCells = document.querySelectorAll('#player-two div');
computerCells.forEach((cell) => {
  cell.addEventListener('click', (e) => {
    const row = e.target.getAttribute('data-cell-x');
    const column = e.target.getAttribute('data-cell-y');
    info.innerText = player.sendAttack(ai, row, column);
    UI.updateBoard(ai);
  });
});
