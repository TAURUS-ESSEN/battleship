function startGame(player) {
    let currentPlayer = player;
    let attackPoint = checkEnemyField(currentPlayer);
    let result = currentPlayer.attack(attackPoint);
    if (result === 'X')
        {
            return startGame(player);
        }
    currentPlayer = currentPlayer === player2 ? player1 : player2; // смена игрока. 
    if (currentPlayer.board.checkGameOver() === 'gameover') {
        return console.log(`gameover - ${currentPlayer.name} is lose` )
    }
        return startGame(currentPlayer);
}
