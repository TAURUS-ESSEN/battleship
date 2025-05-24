'use strict';
export class Player {
    constructor(name, myboard, enemyBoard) {
        this.name = name;
        this.board = myboard;
        this.enemyBoard = enemyBoard;
        this.enemyWounded = false;
        this.targetX = null;
        this.targetY = null;
        this.woundedPossibleCoordinates = []

    }
    attack(arr) {
        const [x, y] = arr;
        console.log(`${this.name} стреляет по координатам ${x},${y}`)
        return this.enemyBoard.receiveAttack(x, y);
        // return this.enemyBoard.receiveAttack(arr);
    }

    addTarget(coordinate) {
        this.enemyWounded = true;
        console.log ('this.enemyWounded ', this.enemyWounded);
        [this.targetX, this.targetY] = coordinate;
        console.log ('coordinate ', coordinate);
        console.log ('this.targetX ', this.targetX, 'this.targetY ', this.targetY);
    }

    killWounded(){
        console.log('--------------------------------');
        console.log('ДОБИВАНИЕ');
        console.log('--------------------------------');
        let x = this.targetX;
        let y = this.targetY;
        console.log('was ist hier? ', this.enemyBoard.battlefield[x][y]);
        if (this.enemyBoard.battlefield[x][y]!=='M') {
            console.log( 'this.targetX', x , 'this.targetY',  y )
            if ((x < 9) && (this.enemyBoard.battlefield[x+1][y] !== 'M') &&  (this.enemyBoard.battlefield[x+1][y] !== 'B')) {
                this.woundedPossibleCoordinates.push([x+1,y])           
            }
            if ((x > 0) && (this.enemyBoard.battlefield[x-1][y] !== 'M' )  &&  (this.enemyBoard.battlefield[x-1][y] !== 'B') ) {
                this.woundedPossibleCoordinates.push([x-1,y])           
            }
            if ((y < 9) && (this.enemyBoard.battlefield[x][y+1] !== 'M')  &&  (this.enemyBoard.battlefield[x][y+1] !== 'B')) {
                this.woundedPossibleCoordinates.push([x,y+1])           
            }
            if  ((y > 0) && (this.enemyBoard.battlefield[x][y-1] !== 'M')  &&  (this.enemyBoard.battlefield[x][y-1] !== 'B')) {
                this.woundedPossibleCoordinates.push([x,y-1])           
            }
            console.log('this.woundedPossibleCoordinates',  this.woundedPossibleCoordinates  )
        }
        console.log(this.woundedPossibleCoordinates[0]);
        [this.targetX, this.targetY] = this.woundedPossibleCoordinates[0];
        return this.enemyBoard.receiveAttack(this.targetX, this.targetY);
    }
}