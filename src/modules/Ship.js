/* eslint-disable no-underscore-dangle */
export default class Ship {
  constructor(name, length) {
    this._name = name;
    this._length = length;
    this.hits = 0;
  }

  get hitsNum() {
    return this.hits;
  }

  get length() {
    return this._length;
  }

  get name() {
    return this._name;
  }

  hit() {
    return this.hits++;
  }

  isSunk() {
    return this.hits === this.length;
  }
}
