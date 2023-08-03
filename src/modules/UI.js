/* eslint-disable no-param-reassign */
import Game from './Game-Controller';
import Ship from './Ship';

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

        div.addEventListener('dragover', (e) => {
          e.target.style.backgroundColor = '#d5e5ec';
        });

        div.addEventListener('dragleave', (e) => {
          e.target.style.backgroundColor = 'white';
        });

        div.addEventListener('drop', (e) => {
          e.target.style.backgroundColor = 'white';
        });
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

  static disableOpponentCells() {
    const allCells = document.querySelectorAll('#player-two div');
    allCells.forEach((cell) => {
      cell.style.pointerEvents = 'none';
    });
  }

  static enableOpponentCells() {
    const allCells = document.querySelectorAll('#player-two div');
    allCells.forEach((cell) => {
      if (cell.getAttribute('data-cell') === 'miss' || cell.getAttribute('data-cell') === 'hit') {
        cell.style.pointerEvents = 'none';
      } else {
        cell.style.pointerEvents = 'auto';
      }
    });
  }

  static initializeGame() {
    const game = new Game();
    const player = game.playerOne;
    const AI = game.playerTwo;

    const flipBtn = document.getElementById('flip-btn');
    const info = document.getElementById('info');

    // Ship handling
    let draggedShip;
    let axis = 'x';
    const options = document.getElementById('options');
    const ships = Array.from(options.children);

    function dragStart(e) {
      draggedShip = e.target;
    }

    function dragOver(e) {
      e.preventDefault();
    }

    function drop(e) {
      const row = e.target.getAttribute('data-cell-x');
      const column = e.target.getAttribute('data-cell-y');
      const name = draggedShip.id;
      const length = draggedShip.getAttribute('data-length');

      const startIndex = [+row, +column];
      const ship = new Ship(name, +length);

      if (player.placeShips(startIndex, ship, axis)) {
        UI.updateBoard(player);
        document.getElementById(`${name}`).remove();
      }

      if (!player.board.checkAllShipsPlaced()) {
        UI.disableOpponentCells();
      } else {
        UI.enableOpponentCells();
        flipBtn.style.visibility = 'hidden';
        info.innerText = 'Make your move!';
      }
    }

    ships.forEach((ship) => ship.addEventListener('dragstart', dragStart));

    // Gameboards handling
    const gameboards = document.getElementById('gameboards');

    function addEventListenersToPlayerCells() {
      const playerCells = document.querySelectorAll('#player-one div');

      playerCells.forEach((cell) => {
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('drop', drop);
        UI.updateBoard(player);
      });
    }

    flipBtn.addEventListener('click', () => {
      axis = axis === 'x' ? 'y' : 'x';
      flipBtn.textContent = axis === 'y' ? 'vertical' : 'horizontal';
    });

    UI.renderGameboard(player);
    UI.renderGameboard(AI);
    game.startGame();
    UI.disableOpponentCells();

    UI.updateBoard(AI);
    UI.updateBoard(player);

    const computerCells = document.querySelectorAll('#player-two div');

    addEventListenersToPlayerCells();

    // Restart game
    const restart = document.getElementById('restart-btn');

    restart.addEventListener('click', () => {
      ships.forEach((ship) => {
        ship.style.visibility = 'visible';
        ship.addEventListener('dragstart', dragStart);
      });

      gameboards.innerHTML = `
        <div class="player-container">
            <div class="board" id="player-one"></div>
            <div class="flip-container">
              <button id="flip-btn">horizontal</button>
            </div>
            <div class="options" id="options">
              <div
                id="carrier"
                class="carrier ship"
                data-length="5"
                draggable="true"
              ></div>
              <div
                id="battleship"
                class="battleship ship"
                data-length="4"
                draggable="true"
              ></div>
              <div
                id="destroyer"
                class="destroyer ship"
                data-length="3"
                draggable="true"
              ></div>
              <div
                id="submarine"
                class="submarine ship"
                data-length="3"
                draggable="true"
              ></div>
              <div
                id="cruiser"
                class="cruiser ship"
                data-length="2"
                draggable="true"
              ></div>
            </div>
          </div>
          <div class="board" id="player-two"></div>`;
      player.board.clearBoard();
      AI.board.clearBoard();
      flipBtn.style.visibility = 'visible';
      info.textContent = 'Place your ships to start playing!';
      this.initializeGame();
    });

    // Game loop
    computerCells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-cell') !== 'none') return;
        UI.disableOpponentCells();
        const row = e.target.getAttribute('data-cell-x');
        const column = e.target.getAttribute('data-cell-y');
        info.innerText = player.sendAttack(AI, row, column);
        UI.updateBoard(AI);

        if (game.isGameOver()) {
          info.innerText = `${game.getWinner()} won the game!`;
          UI.disableOpponentCells();
        } else {
          // game.switchPlayer() does not work as intended, to be updated
          setTimeout(() => {
            info.innerText = AI.sendAttack(player);
            UI.updateBoard(player);
            UI.enableOpponentCells();
            if (game.isGameOver()) {
              setTimeout(() => {
                info.innerText = `${game.getWinner()} won the game!`;
                UI.disableOpponentCells();
              }, 1000);
            }
          }, 1300);
        }
      });
    });
  }
}
