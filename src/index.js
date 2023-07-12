import Player from './modules/Player';

const ai = new Player(true);
const player = new Player(false);
console.log(ai.placeShips());
player.placeShips();
console.log(player.board);
ai.sendAttack(player);
console.log(player.board);
ai.sendAttack(player);
console.log(player.board);
ai.sendAttack(player);
console.log(player.board);
ai.sendAttack(player);
console.log(player.board);
ai.sendAttack(player);
console.log(player.board);
