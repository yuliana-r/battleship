import Player from '../Player';

test('placeShips() works for random AI ship placement', () => {
  const AI = new Player(true);
  AI.placeShips();
  expect(AI.board.checkAllShipsPlaced()).toBe(true);
});
