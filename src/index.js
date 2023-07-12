// console.log('I work');
import Player from './modules/Player';

const ai = new Player(true);
const player = new Player(false);
console.log(ai.placeShips());
console.log(player.placeShips());
