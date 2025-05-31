'use strict';
export class Player {
    constructor(name, myboard, enemyBoard, isHuman) {
        this.name = name;
        this.board = myboard;
        this.isHuman = isHuman;
        this.enemyBoard = enemyBoard;
        this.enemyWounded = false;
        this.targetX = null;
        this.targetY = null;
        this.woundedPossibleCoordinates = []
        this.targetIsSunk = true;

    }
    attack(arr) {
        const [x, y] = arr;
        console.log(`${this.name} стреляет по координатам ${x},${y}`)
        return this.enemyBoard.receiveAttack(x, y, this);
    }

    addTarget(coordinate) {
        this.enemyWounded = true;
        [this.targetX, this.targetY] = coordinate;
    }

    killWounded(){
        this.targetIsSunk = false;
        let x = this.targetX;
        let y = this.targetY;
        if (this.enemyBoard.battlefield[x][y] !=='M') {
            blockTheCorners(x,y,this.enemyBoard)
        }
        if ((this.enemyBoard.battlefield[x][y] !=='M') && (this.woundedPossibleCoordinates.length !== 0)) { 
            this.woundedPossibleCoordinates = filterWoundedPossibleCoordinates(this.enemyBoard, this.woundedPossibleCoordinates);
            findWoundedPossibleCoordinates(x,y,this.enemyBoard, this.woundedPossibleCoordinates)
        }
        if (this.woundedPossibleCoordinates.length === 0) {
            findWoundedPossibleCoordinates(x,y,this.enemyBoard, this.woundedPossibleCoordinates)
        } 
        console.log('в следующий ход', this.woundedPossibleCoordinates[0]);
        [this.targetX, this.targetY] = this.woundedPossibleCoordinates[0];
        this.woundedPossibleCoordinates.shift() 
        return this.enemyBoard.receiveAttack(this.targetX, this.targetY, this);
    }
}


function blockTheCorners(x,y,enemyBoard) {
    if ((x > 0) && (y > 0) && (enemyBoard.battlefield[x-1][y-1] !=='M')) {
        enemyBoard.battlefield[x-1][y-1] = 'B'
    }

    if ((x > 0) && (y < 9) && (enemyBoard.battlefield[x-1][y+1] !=='M')) {
        enemyBoard.battlefield[x-1][y+1] = 'B'
    }

    if ((x < 9) && (y > 0) && (enemyBoard.battlefield[x+1][y-1] !=='M')) {
        enemyBoard.battlefield[x+1][y-1] = 'B'
    }

    if ((x < 9) && (y < 9) && (enemyBoard.battlefield[x+1][y+1] !=='M')) {
        enemyBoard.battlefield[x+1][y+1] = 'B'
    }
    return 
}

function findWoundedPossibleCoordinates(x,y, enemyBoard, woundedPossibleCoordinates ) {
            if ((x < 9) && (enemyBoard.battlefield[x+1][y] !== 'M') &&  (enemyBoard.battlefield[x+1][y] !== 'B') && (enemyBoard.battlefield[x+1][y] !== 'X')) {
                woundedPossibleCoordinates.push([x+1,y])           
            }
            if ((x > 0) && ( enemyBoard.battlefield[x-1][y] !== 'M' )  &&  ( enemyBoard.battlefield[x-1][y] !== 'B')  &&  ( enemyBoard.battlefield[x-1][y] !== 'X') ) {
                woundedPossibleCoordinates.push([x-1,y])           
            }
            if ((y < 9) && ( enemyBoard.battlefield[x][y+1] !== 'M')  &&  ( enemyBoard.battlefield[x][y+1] !== 'B') &&  ( enemyBoard.battlefield[x][y+1] !== 'X') ) {
                woundedPossibleCoordinates.push([x,y+1])           
            }
            if  ((y > 0) && ( enemyBoard.battlefield[x][y-1] !== 'M')  &&  ( enemyBoard.battlefield[x][y-1] !== 'B')  &&  ( enemyBoard.battlefield[x][y-1] !== 'X')) {
                woundedPossibleCoordinates.push([x,y-1])           
            }
    return  
}

function filterWoundedPossibleCoordinates(enemyBoard, woundedPossibleCoordinates) {
        woundedPossibleCoordinates = woundedPossibleCoordinates.filter(([x, y]) => {
                return ((enemyBoard.battlefield[x][y] !== 'B') && (enemyBoard.battlefield[x][y] !== 'X') )
            })
        return  woundedPossibleCoordinates
}