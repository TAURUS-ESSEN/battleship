'use strict';
export class Player {
    constructor(name, myboard, enemyBoard) {
        this.name = name;
        this.board = myboard;
        this.enemyBoard = enemyBoard
    }
    attack(x,y) {
        console.log(`${this.name} стреляет по координатам ${x},${y}`)
        return this.enemyBoard.receiveAttack(x, y);
    }
}