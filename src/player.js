'use strict';
export class Player {
    constructor(name, myboard, enemyBoard) {
        this.name = name;
        this.board = myboard;
        this.enemyBoard = enemyBoard;
        this.enemyWounded = false;
    }
    attack(arr) {
        const [x, y] = arr;
        console.log(`${this.name} стреляет по координатам ${x},${y}`)
        return this.enemyBoard.receiveAttack(x, y);
    }

    killWounded(){
        woundedCoordinates = [];
        woundedPossibleCoordinates = [];
        return this.enemyBoard.receiveAttack(woundedCoordinates[0]);
    }
}