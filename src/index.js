import UI from './modules/UI';
import Game from './modules/Game-Controller';
import Ship from './modules/Ship';
import './styles/style.css';

const gameboards = document.getElementById('gameboards');
let game = new Game();
const info = document.getElementById('info');
const player = game.playerOne;
const AI = game.playerTwo;

function initializeGame() {
  UI.renderGameboard(player);
  UI.renderGameboard(AI);
  // game.startGame();

  UI.updateBoard(AI);
  UI.updateBoard(player);

  const computerCells = document.querySelectorAll('#player-two div');

  computerCells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      UI.disableAllCells();
      const row = e.target.getAttribute('data-cell-x');
      const column = e.target.getAttribute('data-cell-y');
      info.innerText = player.sendAttack(AI, row, column);
      UI.updateBoard(AI);
      console.log(game.currentPlayer);
      console.log(game.opponent);

      if (game.isGameOver()) {
        info.innerText = `${game.getWinner()} won the game!`;
        UI.disableAllCells();
      } else {
        // game.switchPlayer() does not work as intended, to be updated
        setTimeout(() => {
          info.innerText = AI.sendAttack(player);
          UI.updateBoard(player);
          UI.enableAllCells();
          if (game.isGameOver()) {
            setTimeout(() => {
              info.innerText = `${game.getWinner()} won the game!`;
              UI.disableAllCells();
            }, 1000);
          }
        }, 1300);
      }
    });
  });
}

initializeGame();

let draggedShip;
const playerCells = document.querySelectorAll('#player-one div');

const options = document.getElementById('options');
const ships = Array.from(options.children);

function dragStart(e) {
  draggedShip = e.target;
  console.log(draggedShip.id);
}

function dragOver(e) {
  e.preventDefault();
}

let axis = 'x';

function drop(e) {
  const row = e.target.getAttribute('data-cell-x');
  const column = e.target.getAttribute('data-cell-y');
  const name = draggedShip.id;
  const length = draggedShip.getAttribute('data-length');

  const startIndex = [+row, +column];
  const ship = new Ship(name, +length);
  console.log(ship);

  if (player.placeShips(startIndex, ship, axis)) {
    UI.updateBoard(player);
    draggedShip.style.visibility = 'hidden';
    axis = axis === 'x' ? 'y' : 'x';
  }
  console.log(player.board);
}

function addEventListenersToPlayerCells() {
  const playerCells = document.querySelectorAll('#player-one div');

  playerCells.forEach((cell) => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('drop', drop);
    UI.updateBoard(player);
  });
}

ships.forEach((ship) => ship.addEventListener('dragstart', dragStart));
addEventListenersToPlayerCells();

const restart = document.getElementById('restart-btn');

restart.addEventListener('click', () => {
  console.log(player.board);
  ships.forEach((ship) => {
    ship.style.visibility = 'visible';
    ship.addEventListener('dragstart', dragStart);
  });
  gameboards.innerHTML = `
  <div class="board" id="player-one"></div>
    <div class="board" id="player-two"></div>`;
  game = new Game();
  player.board.clearBoard();
  AI.board.clearBoard();
  UI.renderGameboard(player);
  UI.renderGameboard(AI);
  addEventListenersToPlayerCells();
});
