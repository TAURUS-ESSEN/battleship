'use strict';
export class Gameboard {
    constructor(name) {
        this.name = name;
        this.battlefield = Array(10).fill(null).map(() => Array(10).fill(null));
    }
    placeShips(fleet) {
        fleet.forEach(ship => {
        console.log(startPointGenerator(this.battlefield, ship.length))

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
    console.log('hi',x,y,shiplength,battlefield)
    const direction = Math.floor(Math.random()*2);
    if (direction===0) {
        // это горизонталь и пробуем направо.
        console.log('ось X',battlefield[x])
        if (y+shiplength <= 10) {
            let result = battlefield[x].slice(y,y+shiplength).every(cell => cell === null)
            console.log(result)
            if (result) {
                console.log('значение точки входа до фильтра = ', battlefield[x][y], 'координаты Array[',x,'][',y,']');
                for (let i = 0; i< shiplength; i++){
                    battlefield[x][y] = 0;
                    y+=1;
                    console.log(battlefield[x])
                }
                return console.log('корабль успешно добавлен')
            }
        }
        if (y-shiplength >= 0)  {
            console.log('добавим в обратную сторону ща')
            let result = battlefield[x].slice(y-shiplength,y).every(cell => cell === null);
            if (result) {
                console.log('значение точки входа до фильтра = ', battlefield[x][y], 'координаты Array[',x,'][',y,']');
                for (let i = 0; i< shiplength; i++){
                    battlefield[x][y] = 0;
                    y-=1;
                    console.log(battlefield[x])
                }
                return console.log('корабль успешно добавлен')
            }
        }
    }
    if (direction === 1) {
        console.log('делаем все для вертикали')
    }
}
