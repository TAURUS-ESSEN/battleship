'use strict';
export class Gameboard {
    constructor(name) {
        this.name = name;
        this.battlefield = Array(10).fill('-').map(() => Array(10).fill('-'));
    }
    placeShips(fleet) {
        this.fleet = fleet
        fleet.forEach(ship => {
            console.log('-----------------')
            startPointGenerator(this.battlefield, ship)
        })
        
    }

    checkGameOver() {
        const notAllSunk = this.fleet.some(ship=> ship.sunk===false);
        console.log('notAllSunk=',notAllSunk)
        if (!notAllSunk) {
            return 'gameover'
        }
        console.log("еще не все потонули")
    } 

    receiveAttack(x, y) {
        console.log(`получен выстрел ${x}${y}`)
        console.log(`this.battlefield[x][y] = ${this.battlefield[x][y]} `)
        if (this.battlefield[x][y] === '-')
        {
            return this.battlefield[x][y] = 'M';
        }
        else {
            console.log('ПОПАЛИ',this.battlefield[x][y])
            let ship = this.battlefield[x][y]
            console.log('ship.type', ship.type)
            ship.hit();
            ship.isSunk();
            // this.checkGameOver();
            console.log('ship type=',ship.type,'ship.hits=', ship.hits, 'sunk=',ship.sunk)
            return this.battlefield[x][y] = 'X';
        }
    }
}
function startPointGenerator(battlefield, ship) {
    const x = Math.floor(Math.random()*10);
    const y = Math.floor(Math.random()*10);
    if (battlefield[x][y] === '-') {
        let startpunkt = {osX: x, osY: y };
        console.log('не занято', startpunkt)
        checkBeforePlacement(x,y,ship,battlefield)
    }
    else {
        console.log('занято, перезапуск')
        startPointGenerator(battlefield, ship); 
    }
}

function checkBeforePlacement(x,y,ship, battlefield) {
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
                }
                return console.log('корабль вправо успешно добавлен')
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
                }
                return console.log('корабль влево успешно добавлен')
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
                }
                return (console.log('корабль вниз добавлен'))
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
                }
                return (console.log('корабль вверх добавлен'))
            }
            else {
                return startPointGenerator(battlefield, ship);
            }
        }
    }
} 