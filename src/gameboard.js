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
    } 

    receiveAttack(x, y) {
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
    console.log('x =',x,'y =',y,'shiplength =',shiplength)
    let lineDown = '';
    let lineUp = '';
    let columnRight = '-';
    let columnLeft = '-';
    const direction = Math.floor(Math.random()*2);
    if (direction===0) {       
        if (y+shiplength <= 10) {
            console.log('идем вправо по горизонтали');
            let startY = Math.max(0, y - 1);
            let endY = Math.min(10, y + shiplength + 1);
            console.log('startY', startY,'endY', endY);
            let currentLine = battlefield[x].slice(startY, endY).every(cell => cell === '-');
            if (x < 9) {
                lineDown = battlefield[x + 1].slice(startY, endY).every(cell => cell === '-');
            } else { lineDown = true }
            if (x > 0) {
                lineUp = battlefield[x - 1].slice(startY, endY).every(cell => cell === '-');
            }
            else { lineUp = true }
            console.log('currentline',currentLine,'linedown',lineDown, 'lineUp', lineUp)
            if (currentLine && lineUp && lineDown) {
                for (let i = 0; i< shiplength; i++){
                    battlefield[x][y+i] = '0';
                }
                return console.log('корабль успешно добавлен')
            }
            else {
                console.log('не получилось. перезапуск')
                return startPointGenerator(battlefield, shiplength);
            }
        }
        if (y-shiplength >= 0)  {
        let startY = Math.max(0, y - shiplength - 1);
        let endY = y + 1;
            console.log('идем влево startY', startY,'endY', endY);
            let currentLine = battlefield[x].slice(startY, endY).every(cell => cell === '-');
            if (x < 9) {
                lineDown = battlefield[x+1].slice(startY, endY).every(cell => cell === '-');
            }
            else { lineDown = true }
            if (x > 0) {
                lineUp = battlefield[x-1].slice(startY, endY).every(cell => cell === '-');
            }
            else { lineUp = true }
            if (currentLine && lineUp && lineDown) {
                for (let i = 0; i< shiplength; i++) {
                    battlefield[x][y-i] = '1';
                }
                return console.log('корабль успешно добавлен')
            }
            else {
                console.log('не получилось. перезапуск')
                return startPointGenerator(battlefield, shiplength);
            }
        } 
    }
    if (direction === 1) {
        console.log('делаем все для вертикали')
        if (x + shiplength <= 10) {
            console.log('идем вниз')
            let startX = Math.max(0, x - 1);
            let endX = Math.min(10, x + shiplength + 1);
            let test = battlefield.slice(startX, endX);
            let currentColumn = test.every(array => array[y] === '-') 
            if (y < 9) {
                columnRight = test.every(array => array[y+1] === '-') 
            }
            else {  columnRight = true }
            if (y > 0) {
                columnLeft = test.every(array => array[y-1] === '-') 
            }
            else {  columnLeft = true }
            console.log(currentColumn, columnLeft, columnRight)
            if (currentColumn && columnLeft && columnRight) {
                for (let i = 0; i < shiplength; i++){
                    battlefield[x+i][y] = '2';
                }
                return (console.log('корабль вниз добавлен'))
            }
            else {
                startPointGenerator(battlefield, shiplength);
            }
        }
        else { 
            console.log('идем вверх')
            // let startX = Math.max(10, x + 1);
            // let endX = Math.min(0, x - shiplength - 1);
            // let test = battlefield.slice(startX, endX);
            // let test = battlefield.slice(endX, startX);
                let startX = Math.max(0, x - shiplength - 1);  // немного выше
    let endX = x + 1;                              // до самой клетки x включительно
    let test = battlefield.slice(startX, endX);    // срез по вертикали
            let currentColumn = test.every(array => array[y] === '-') 
            if (y < 9) {
                columnRight = test.every(array => array[y+1] === '-') 
            }
            else {  columnRight = true }
            if (y > 0) {
                columnLeft = test.every(array => array[y-1] === '-') 
            }
            else {  columnLeft = true }
            console.log(currentColumn, columnLeft, columnRight)
            if (currentColumn && columnLeft && columnRight) {
                for (let i = 0; i < shiplength; i++){
                    battlefield[x-i][y] = '3';
                }
                return (console.log('корабль вверх добавлен'))
            }
            else {
                startPointGenerator(battlefield, shiplength);
            }
            // console.log('comming soon') 

            
        }
    }
} 
