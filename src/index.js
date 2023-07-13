import Player from './modules/Player';
import UI from './modules/UI';
import './styles/style.css';

const ai = new Player(true);
const player = new Player(false);
// console.log(ai.placeShips());
player.placeShips();
ai.placeShips();
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// ai.sendAttack(player);
// console.log(player.board);

UI.renderGameboard(player);
UI.renderGameboard(ai);
