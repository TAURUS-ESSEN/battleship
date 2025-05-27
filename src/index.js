'use strict';
import {Ship} from './ship.js';
import {Gameboard} from './gameboard.js';
import {Player} from './player.js';
import {drawPlayer1Board, drawPlayer2Board, currentPlayerName, drawShips, gameOver} from './render.js';

function createFleet() {
    return [
        new Ship("linkor", 4),
        new Ship("crusader1", 3),
        new Ship("crusader2", 3),
        new Ship("submarine", 2),
        new Ship("mine1", 1),
        new Ship("mine2", 1),
    ];
}

export function initializeGame(player1Name) {
    const fleet1 = createFleet();
    const fleet2 = createFleet();
    const player1Board = new Gameboard("player1GameBoard");
    const player2Board = new Gameboard("player2GameBoard");
    player1Board.placeShips(fleet1);
    player2Board.placeShips(fleet2);
    const player1 = new Player(player1Name, player1Board, player2Board, true);
    const player2 = new Player('Captain Jack', player2Board, player1Board, false);
    const game = { currentPlayer: null, player1, player2}
    return whoIsFirst(game);
}
let counter = 0;
// initializeGame()


function whoIsFirst(game) {
    let firstTurn = Math.floor(Math.random()*2+1);
    game.currentPlayer = firstTurn === 1 ? game.player1 : game.player2;
    // startGame(game);
    return game;
}

export function startGame(game) {
    drawPlayer1Board(game.player1.board.battlefield)
    drawPlayer2Board(game.player2.board.battlefield)
    drawShips()
    currentPlayerName(game.currentPlayer.name)

    if (game.currentPlayer.isHuman === true) {
        return console.log('это ход человека.')
    }
    console.log('Ход игрока - ', game.currentPlayer.name, 'enemyWounded', game.currentPlayer.enemyWounded)
    let attackResult = '';
    let attackPoint = null;
    if (game.currentPlayer.enemyWounded === true) {
            attackResult = game.currentPlayer.killWounded();
            //сюда не захожу человеком
        }
    else {
        attackPoint = checkEnemyField(game.currentPlayer);
        attackResult = game.currentPlayer.attack(attackPoint);
        console.log('Результат стрельбы =', attackResult)
    }
    if (attackResult === 'X')
        {
        if (game.currentPlayer.enemyBoard.checkGameOver() === 'gameover') {
            drawPlayer1Board(game.player1.board.battlefield)
            drawPlayer2Board(game.player2.board.battlefield)
            alert('1')
            // return console.log(`gameover - ${game.currentPlayer.name} is win` )
            return gameOver()
        }
        alert('x')
            console.log('повторый ход!')
            if ((game.currentPlayer.enemyWounded === false) && (game.currentPlayer.targetIsSunk === false))
                { 
                    game.currentPlayer.addTarget(attackPoint) 
                }
                
            return startGame(game);
        }
    counter++; // вспомогательный счетчки удалить потом.
    console.log(`counter=`, counter,'заканчивает ход',game.currentPlayer.name)
    game.currentPlayer = game.currentPlayer === game.player2 ? game.player1 : game.player2; // смена игрока. 
    console.log(`Произошла смена игрока на ${game.currentPlayer.name}`)
    // draw(game) // вспомогательный код. рисует доску.
        return startGame(game);
}

// function computerTurn(game) {
//     console.log('Ход игрока - ', game.currentPlayer.name, 'enemyWounded', game.currentPlayer.enemyWounded)
//     let attackResult = '';
//     let attackPoint = null;
//     if (game.currentPlayer.enemyWounded === true) {
//             attackResult = game.currentPlayer.killWounded();
//         }
//     else {
//         attackPoint = checkEnemyField(game.currentPlayer);
//         attackResult = game.currentPlayer.attack(attackPoint);
//         console.log('Результат стрельбы =', attackResult)
//     }
//     if (attackResult === 'X')
//         {
//         if (game.currentPlayer.enemyBoard.checkGameOver() === 'gameover') {
//             return console.log(`gameover - ${game.currentPlayer.name} is win` )
//         }
//             console.log('повторый ход!')
//             if ((game.currentPlayer.enemyWounded === false) && (game.currentPlayer.targetIsSunk === false))
//                 { 
//                     game.currentPlayer.addTarget(attackPoint) 
//                 }
//             return startGame(game);
//         }
//     counter++; // вспомогательный счетчки удалить потом.
//     console.log(`counter=`, counter,'заканчивает ход',game.currentPlayer.name)
//     game.currentPlayer = game.currentPlayer === game.player2 ? game.player1 : game.player2; // смена игрока. 
//     console.log(`Произошла смена игрока на ${game.currentPlayer.name}`)
//     draw(game) // вспомогательный код. рисует доску.
//         return startGame(game);
// }

function checkEnemyField(currentPlayer) {
    let x = Math.floor(Math.random()*10);
    if (!currentPlayer.enemyBoard.battlefield[x].some(value => (value !== 'X') && (value !=='M') && (value !== 'B'))) {
        console.log('строка уже забита \ отстреляна')
        return checkEnemyField(currentPlayer)
    }
    let y = Math.floor(Math.random()*10);
    if ((currentPlayer.enemyBoard.battlefield[x][y]==='X') || (currentPlayer.enemyBoard.battlefield[x][y]==='M') || (currentPlayer.enemyBoard.battlefield[x][y]==='B')) {
        console.log(`ячейка ${x}${y} уже занята там стоит =`,currentPlayer.enemyBoard.battlefield[x][y])
        return checkEnemyField(currentPlayer)
    }
    let coordinate = [x,y]; 
    return coordinate
}
function draw(game) {
console.log (' EUGEN    0    1    2    3    4    5    6    7    8    9 ')
console.log('x0', game.player1.board.battlefield[0])
console.log('x1',game.player1.board.battlefield[1])
console.log('x2',game.player1.board.battlefield[2])
console.log('x3',game.player1.board.battlefield[3])
console.log('x4',game.player1.board.battlefield[4])
console.log('x5',game.player1.board.battlefield[5])
console.log('x6',game.player1.board.battlefield[6])
console.log('x7',game.player1.board.battlefield[7])
console.log('x8',game.player1.board.battlefield[8])
console.log('x9',game.player1.board.battlefield[9])


console.log (' Mister X  0    1    2    3    4    5    6    7    8    9 ')
console.log('x0', game.player2.board.battlefield[0])
console.log('x1',game.player2.board.battlefield[1])
console.log('x2',game.player2.board.battlefield[2])
console.log('x3',game.player2.board.battlefield[3])
console.log('x4',game.player2.board.battlefield[4])
console.log('x5',game.player2.board.battlefield[5])
console.log('x6',game.player2.board.battlefield[6])
console.log('x7',game.player2.board.battlefield[7])
console.log('x8',game.player2.board.battlefield[8])
console.log('x9',game.player2.board.battlefield[9])
}
