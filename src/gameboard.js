'use strict';
import {playHit, playMiss, playSunk, gameOver} from './render.js'

export class Gameboard {
    constructor(name) {
        this.name = name;
        this.battlefield = Array(10).fill('-').map(() => Array(10).fill('-'));
    }
    placeShips(fleet) {
        this.fleet = fleet
        fleet.forEach(ship => {
            startPointGenerator(this.battlefield, ship)
        })
        
    }

    checkGameOver() {
        console.log('проверка на уничтожение');
        const notAllSunk = this.fleet.some(ship=> ship.sunk===false);
        console.log('notAllSunk=',notAllSunk)
        if (!notAllSunk) {
            // alert('2.5')
            return 'gameover'
        }
    } 

    receiveAttack(x, y, player) {
        console.log(`получен выстрел по ${x}.${y} в этой клетке было = ${this.battlefield[x][y]} `)
        if (this.battlefield[x][y] === '-')
        {
            playMiss()
            return this.battlefield[x][y] = 'M';
        }
        else {
            let ship = this.battlefield[x][y]
            console.log('ПОПАЛИ',this.battlefield[x][y], 'ship.type', ship.type)
            ship.hit();
            playHit()
            let istSunk = ship.isSunk();
            if (istSunk) {
                this.blockSurroundingCells(ship);
                player.enemyWounded = false;
                player.targetIsSunk = true;
                player.woundedPossibleCoordinates.length = 0;
                playSunk();
                this.battlefield[x][y] = 'X';
                return this.checkGameOver() 
            }
            player.targetIsSunk = false
            console.log('ship type=',ship.type,'ship.hits=', ship.hits, 'sunk=',ship.sunk)
            return this.battlefield[x][y] = 'X';
        }
    }

    blockSurroundingCells(ship) {
        console.log(`ship=${ship.type}, ship.sunk = ${ship.sunk}, ship.coordinates = ${ship.coordinates}`);
        ship.coordinates.forEach(arr => {
            let [x,y] = arr
            if (x + 1 < 10 && this.battlefield[x + 1][y] === '-') this.battlefield[x + 1][y] = 'B';
            if (x - 1 >= 0 && this.battlefield[x - 1][y] === '-') this.battlefield[x - 1][y] = 'B';
            if (y - 1 >= 0 && this.battlefield[x][y-1] === '-') this.battlefield[x][y-1] = 'B';
            if (y + 1 < 10 && this.battlefield[x][y+1] === '-') this.battlefield[x][y+1] = 'B';
            //теперь диагонали
            if (x - 1 >= 0 && y-1 >=0  && this.battlefield[x - 1][y - 1] === '-') this.battlefield[x - 1][y-1] = 'B';
            if (x + 1 < 10 && y-1 >=0  && this.battlefield[x + 1][y - 1] === '-') this.battlefield[x + 1][y-1] = 'B';
            if (x - 1 >= 0 && y+1 <10  && this.battlefield[x - 1][y + 1] === '-') this.battlefield[x - 1][y+1] = 'B';
            if (x + 1 < 10 && y+1 <10  && this.battlefield[x + 1][y + 1] === '-') this.battlefield[x + 1][y+1] = 'B';
        })
    }
}
function startPointGenerator(battlefield, ship) {
    const x = Math.floor(Math.random()*10);
    const y = Math.floor(Math.random()*10);
    if (battlefield[x][y] === '-') {
        checkBeforePlacement(x,y,ship,battlefield)
    }
    else {
        // console.log('занято, перезапуск')
        startPointGenerator(battlefield, ship); 
    }
}

function checkBeforePlacement(x,y,ship, battlefield) {
    ship.coordinates = [];
    const direction = Math.floor(Math.random() * 2);
    if (direction === 0) {       
        if (y + ship.length <= 10) {
            const startY = Math.max(0, y - 1);
            const endY = Math.min(10, y + ship.length + 1);
            const currentLine = battlefield[x].slice(startY, endY).every(cell => cell === '-');
            const lineDown = x < 9 ? battlefield[x + 1].slice(startY, endY).every(cell => cell === '-') : true;
            const lineUp = x > 0 ? battlefield[x - 1].slice(startY, endY).every(cell => cell === '-') : true;
            if (currentLine && lineUp && lineDown) {
                for (let i = 0; i < ship.length; i++){
                    battlefield[x][y + i] = ship;
                    ship.coordinates.push([x,y + i])
                }
                return  
            }
            else {
                return startPointGenerator(battlefield, ship);
            }
        }
        if (y-ship.length >= 0)  {
            const startY = Math.max(0, y - ship.length - 1);
            const endY = y + 1;
            const currentLine = battlefield[x].slice(startY, endY).every(cell => cell === '-');
            const lineDown = x < 9 ? battlefield[x+1].slice(startY, endY).every(cell => cell === '-') : true;
            const lineUp = x > 0 ? battlefield[x-1].slice(startY, endY).every(cell => cell === '-') : true;
            if (currentLine && lineUp && lineDown) {
                for (let i = 0; i < ship.length; i++) {
                    battlefield[x][y - i] = ship;
                    ship.coordinates.push([x,y - i])
                }
                return  
            }
            else {
                return startPointGenerator(battlefield, ship);
            }
        } 
    }
    if (direction === 1) {
        if (x + ship.length <= 10) {
            const startX = Math.max(0, x - 1);
            const endX = Math.min(10, x + ship.length + 1);
            const test = battlefield.slice(startX, endX);
            const currentColumn = test.every(array => array[y] === '-') 
            const columnRight = y < 9 ? test.every(array => array[y + 1] === '-') : true 
            const columnLeft = y > 0 ? test.every(array => array[y - 1] === '-') : true 
            if (currentColumn && columnLeft && columnRight) {
                for (let i = 0; i < ship.length; i++){
                    battlefield[x + i][y] = ship;
                    ship.coordinates.push([x + i,y])
                }
                return  
            }
            else {
                return startPointGenerator(battlefield, ship);
            }
        }
        if (x - ship.length >= 0) { 
            const startX = Math.max(0, x - ship.length - 1);
            const endX = x + 1;                            
            const test = battlefield.slice(startX, endX);    
            const currentColumn = test.every(array => array[y] === '-') 
            const columnRight = y < 9 ? test.every(array => array[y + 1] === '-') : true; 
            const columnLeft = y > 0 ? test.every(array => array[y - 1] === '-') : true; 
            if (currentColumn && columnLeft && columnRight) {
                for (let i = 0; i < ship.length; i++){
                    battlefield[x - i][y] = ship;
                    ship.coordinates.push([x - i,y])
                }
                return  
            }
            else {
                return startPointGenerator(battlefield, ship);
            }
        }
    }
} 