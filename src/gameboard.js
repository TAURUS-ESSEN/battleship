'use strict';
export class Gameboard {
    constructor(name) {
        this.name = name;
        this.battlefield = Array(10).fill('-').map(() => Array(10).fill('-'));
    }
    placeShips(fleet) {
        fleet.forEach(ship => {
            console.log('-----------------')
            startPointGenerator(this.battlefield, ship.length)
        })
        
    }

    checkGameOver() {
        if (this.battlefield.filter(arr=> arr.some(value=> value === '0')).length === 0) {
            return 'gameover'
        }
        else {
            return 'no'
        }
    } 

    receiveAttack(x, y) {
        return this.battlefield[x][y] = this.battlefield[x][y] === '0' ? 'X' : 'M';
    }
}
function startPointGenerator(battlefield, shiplength) {
    const x = Math.floor(Math.random()*10);
    const y = Math.floor(Math.random()*10);
    // console.log('значение точки входа до фильтра = ', battlefield[x][y], 'координаты Array[',x,'][',y,']');
    if (battlefield[x][y] === '-') {
        let startpunkt = {osX: x, osY: y };
        console.log('не занято', startpunkt)
        checkBeforePlacement(x,y,shiplength,battlefield)
    }
    else {
        console.log('занято, перезапуск')
        startPointGenerator(battlefield, shiplength); 
    }
}

function checkBeforePlacement(x,y,shiplength, battlefield) {
    const direction = Math.floor(Math.random() * 2);
    if (direction === 0) {       
        if (y + shiplength <= 10) {
            const startY = Math.max(0, y - 1);
            const endY = Math.min(10, y + shiplength + 1);
            const currentLine = battlefield[x].slice(startY, endY).every(cell => cell === '-');
            const lineDown = x < 9 ? battlefield[x + 1].slice(startY, endY).every(cell => cell === '-') : true;
            const lineUp = x > 0 ? battlefield[x - 1].slice(startY, endY).every(cell => cell === '-') : true;
            if (currentLine && lineUp && lineDown) {
                for (let i = 0; i < shiplength; i++){
                    battlefield[x][y + i] = '0';
                }
                return console.log('корабль вправо успешно добавлен')
            }
            else {
                return startPointGenerator(battlefield, shiplength);
            }
        }
        if (y-shiplength >= 0)  {
            const startY = Math.max(0, y - shiplength - 1);
            const endY = y + 1;
            const currentLine = battlefield[x].slice(startY, endY).every(cell => cell === '-');
            const lineDown = x < 9 ? battlefield[x+1].slice(startY, endY).every(cell => cell === '-') : true;
            const lineUp = x > 0 ? battlefield[x-1].slice(startY, endY).every(cell => cell === '-') : true;
            if (currentLine && lineUp && lineDown) {
                for (let i = 0; i < shiplength; i++) {
                    battlefield[x][y - i] = '0';
                }
                return console.log('корабль влево успешно добавлен')
            }
            else {
                return startPointGenerator(battlefield, shiplength);
            }
        } 
    }
    if (direction === 1) {
        if (x + shiplength <= 10) {
            const startX = Math.max(0, x - 1);
            const endX = Math.min(10, x + shiplength + 1);
            const test = battlefield.slice(startX, endX);
            const currentColumn = test.every(array => array[y] === '-') 
            const columnRight = y < 9 ? test.every(array => array[y + 1] === '-') : true 
            const columnLeft = y > 0 ? test.every(array => array[y - 1] === '-') : true 
            if (currentColumn && columnLeft && columnRight) {
                for (let i = 0; i < shiplength; i++){
                    battlefield[x + i][y] = '0';
                }
                return (console.log('корабль вниз добавлен'))
            }
            else {
                return startPointGenerator(battlefield, shiplength);
            }
        }
        if (x - shiplength >= 0) { 
            const startX = Math.max(0, x - shiplength - 1);
            const endX = x + 1;                            
            const test = battlefield.slice(startX, endX);    
            const currentColumn = test.every(array => array[y] === '-') 
            const columnRight = y < 9 ? test.every(array => array[y + 1] === '-') : true; 
            const columnLeft = y > 0 ? test.every(array => array[y - 1] === '-') : true; 
            if (currentColumn && columnLeft && columnRight) {
                for (let i = 0; i < shiplength; i++){
                    battlefield[x - i][y] = '0';
                }
                return (console.log('корабль вверх добавлен'))
            }
            else {
                return startPointGenerator(battlefield, shiplength);
            }
        }
    }
} 


