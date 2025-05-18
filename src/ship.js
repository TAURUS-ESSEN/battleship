'use strict'

export class Ship {
    constructor(type,length,hits,sunk) {
        this.type = type;
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }
    hit() {
        this.hits++;
    }

    isSunk() {
        this.sunk = this.hits === this.length;
        return this.sunk 
    } 
}


module.exports = {
    Ship
};