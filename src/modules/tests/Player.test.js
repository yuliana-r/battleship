import Player from '../Player';

test('AI places all ships in valid positions', () => {
  function setUpAIBoard() {
    const AI = new Player(true);
    AI.placeShips();
    return AI.board.checkAllShipsPlaced();
  }

  function checkValidPlacement() {
    const output = Array.from({ length: 5 }, () => setUpAIBoard());
    return output.every((result) => result);
  }

  expect(checkValidPlacement()).toBe(true);
});
