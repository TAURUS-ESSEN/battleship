'use strict'
export class Ship {
    constructor(type,length) {
        this.type = type;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.coordinates = [];
    }
    
    hit() {
        if (this.hits < this.length) {
            return ++this.hits;
        }
        else {
            throw new Error("Ship has already been sunk.");
        }
    }

    isSunk() {
        this.sunk = this.hits === this.length;
        return this.sunk 
    } 
}