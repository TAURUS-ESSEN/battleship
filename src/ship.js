'use strict'

 export class Ship {
    constructor(type,length) {
        this.type = type;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }
    hit() {
        if (this.hits < this.length) {
            return ++this.hits;
        }
        else {
            console.log("превышено колчиество возможных попаданий")
               throw new Error("Ship has already been sunk.");
        }
    }

    isSunk() {
        this.sunk = this.hits === this.length;
        return this.sunk 
    } 
}