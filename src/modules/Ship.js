export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  get hitsNum() {
    return this.hits;
  }

  hit() {
    return this.hits++;
  }

  isSunk() {
    return this.hits === this.length;
  }
}
