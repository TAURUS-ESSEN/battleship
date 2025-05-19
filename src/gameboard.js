'use strict';
export class Gameboard {
    constructor(name) {
        this.name = name;
        this.battlefield = Array(10).fill(null).map(() => Array(10).fill(null));
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
    // console.log(battlefield)
    const x = Math.floor(Math.random()*10);
    const y = Math.floor(Math.random()*10);
    console.log('значение точки входа до фильтра = ', battlefield[x][y], 'координаты Array[',x,'][',y,']');
    if (battlefield[x][y] === null) {
        let startpunkt = {osX: x, osY: y };
        console.log('не занято', startpunkt)
        checkBeforePlacement(x,y,shiplength,battlefield)
    }
    else {
        console.log('занято, перезапуск')
        startPointGenerator(battlefield); 
    }
}

function checkBeforePlacement(x,y,shiplength, battlefield) {
    console.log('hi',x,y,shiplength)
    let lineDown = null;
    let lineUp = null;
    const direction = Math.floor(Math.random()*2);
    if (direction===0) {        // это горизонталь и пробуем направо.
        if (y+shiplength <= 10) {

            console.log('идем вправо');
            let currentLine = battlefield[x].slice(y-1,y+shiplength+1).every(cell => cell === null);
            if (x!=9) {
                lineDown = battlefield[x+1].slice(y-1,y+shiplength+1).every(cell => cell === null);
            }
            else {  lineDown = true }
            if (x!=0) {
                lineUp = battlefield[x-1].slice(y-1,y+shiplength+1).every(cell => cell === null);
            }
            else {  lineUp = true }
            if (currentLine && lineUp && lineDown) {
                for (let i = 0; i< shiplength; i++){
                    battlefield[x][y] = 0;
                    y+=1;
                    console.log(battlefield[x])
                }
                return console.log('корабль успешно добавлен')
            }
            else {
                checkBeforePlacement(x,y,shiplength, battlefield) 
            }
        }
        if (y-shiplength >= 0)  {
            console.log('идем влево')
            let currentLine = battlefield[x].slice(y-shiplength,y).every(cell => cell === null);
            if (x!=9) {
                lineDown = battlefield[x+1].slice(y-1,y+shiplength+1).every(cell => cell === null);
            }
            else {  lineDown = true }
            if (x!=0) {
                lineUp = battlefield[x-1].slice(y-1,y+shiplength+1).every(cell => cell === null);
            }
            else {  lineUp = true }
            if (currentLine && lineUp && lineDown) {
                for (let i = 0; i< shiplength; i++){
                    battlefield[x][y] = 0;
                    y-=1;
                    console.log(battlefield[x])
                }
                return console.log('корабль успешно добавлен')
            }
            else {
                     
                checkBeforePlacement(x,y,shiplength, battlefield) 
            
            }

        } else {
            console.log('тут будет попытка либо проверить вертикаль либо перезапуск вообще этой функции');
        }
    }
    if (direction === 1) {
        console.log('делаем все для вертикали')
    //     console.log('ось X',battlefield[x])
    //     if (x+shiplength <= 10) {
    //         // идем вниз по вертикали
    //         console.log('идем вниз')

    //     }
    //     if (x-shiplength >= 0) {
    //         // идем вниз по вертикали
    //         console.log('идем вверх')

    //     }

    }
}
