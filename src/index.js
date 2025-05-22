'use strict';
import {Ship} from './ship.js';
import {Gameboard} from './gameboard.js';
import {Player} from './player.js';

function createFleet() {
    return [
        new Ship("linkor", 4),
        new Ship("crusader1", 3),
        new Ship("crusader2", 3),
        new Ship("submarine", 2),
        new Ship("minesweeper1", 1),
        new Ship("minesweeper2", 1),
    ];
}

function initializeGame() {
    const fleet1 = createFleet();
    const fleet2 = createFleet();
    const player1Board = new Gameboard("player1GameBoard");
    const player2Board = new Gameboard("player2GameBoard");
    player1Board.placeShips(fleet1);
    player2Board.placeShips(fleet2);
    const player1 = new Player('Eugen', player1Board, player2Board);
    const player2 = new Player('Mister X', player2Board, player1Board);
    const game = { currentPlayer: null, player1, player2}
    return whoIsFirst(game);
}
let counter = 0;
initializeGame()

function whoIsFirst(game) {
    let firstTurn = Math.floor(Math.random()*2+1);
    game.currentPlayer = firstTurn === 1 ? game.player1 : game.player2;
    startGame(game);
}

function startGame(game) {
    // let currentPlayer = game.currentPlayer;
    console.log('Ход игрока - ', game.currentPlayer.name)
    let attackResult = '';
    if (game.currentPlayer.enemyWounded === 'l;') {
        console.log('стрельба по заданным координатам будет тут')
        attackResult = game.currentPlayer.killWounded();
    }
    else {
        let attackPoint = checkEnemyField(game.currentPlayer);
        attackResult = game.currentPlayer.attack(attackPoint);
        console.log('Результат стрельбы =', attackResult)
    }
    if (attackResult === 'X')
        {
        game.currentPlayer.enemyWounded = true;
        console.log("game.currentPlayer",game.currentPlayer)
        if (game.currentPlayer.enemyBoard.checkGameOver() === 'gameover') {
            return console.log(`gameover - ${game.currentPlayer.name} is win` )
        }
            // сделать тут логику добивания.
            console.log('повторый ход!')
            return startGame(game);
        }
    counter++; // вспомогательный счетчки удалить потом.
    console.log(`counter=`, counter,'заканчивает ход',game.currentPlayer.name)
    game.currentPlayer = game.currentPlayer === game.player2 ? game.player1 : game.player2; // смена игрока. 
    console.log(`Произошла смена игрока на ${game.currentPlayer.name}`)
    draw(game) // вспомогательный код. рисует доску.
        return startGame(game);
}

function checkEnemyField(currentPlayer) {
    let x = Math.floor(Math.random()*10);
    if (!currentPlayer.enemyBoard.battlefield[x].some(value => (value !== 'X') && (value !=='M') && (value !== 'B'))) {
        console.log('строка уже забита \ отстреляна');
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
