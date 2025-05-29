function drawBoard(playerBoard, battlefield = '', isPlayer2 = false) {
    playerBoard.textContent = '';
    if (isPlayer2) { playerBoard.classList.remove('disabled');}
        
    for (let i = 0; i <= 9; i++) {
    const row = document.createElement('div');
        for (let j = 0; j <= 9; j++) {
            const cell = document.createElement('div');   
            if (isPlayer2) {             
                cell.dataset.x = i;
                cell.dataset.y = j;
            }
            cell.classList.add('empty');
                
            if( battlefield !=='') { 
                const current = battlefield[i][j];
                if (typeof(current) !== 'object' && current !== '-') {
                    cell.classList.remove('empty');
                    if (current === 'M' || current === 'B') {
                        cell.classList.add('miss');
                    } else {
                        cell.classList.add('hit');
                    }
                }
            }
            row.appendChild(cell)
        }
    playerBoard.appendChild(row)
    }
}   

function drawPlayer1Board(battlefield = '') {
    for (let i = 0; i<=9; i++) {
        let string = document.createElement('div');
            for (let j=0; j<=9; j++) {
                let cell = document.createElement('div');
                cell.classList.add('empty');
                if( battlefield !=='')
                { 
                    if (battlefield[i][j] ==='-') {
                    } 
                    if ((typeof(battlefield[i][j]) !== 'object') && (battlefield[i][j] !=='-')) {
                        cell.classList.remove('empty');
                        if ((battlefield[i][j] === 'M') || (battlefield[i][j] === 'B')) {
                            cell.classList.add('miss');
                        }
                        else {
                            cell.classList.add('hit');
                        }
                    }
                }
                string.appendChild(cell)
            }
        player1Board.appendChild(string)
    }
}

function drawPlayer2Board(battlefield = '') {
    player2Board.classList.remove('disabled');
    player2Board.textContent = '';
    for (let i = 0; i<=9; i++) {
        let string = document.createElement('div');
            for (let j=0; j<=9; j++) {
                let cell = document.createElement('div');
                cell.dataset.x = i;
                cell.dataset.y = j;
                cell.classList.add('empty');
                if( battlefield !=='')
                { 
                    if ((typeof(battlefield[i][j]) !== 'object') && (battlefield[i][j] !=='-')) {
                        cell.classList.remove('empty');
                        if ((battlefield[i][j] === 'M') || (battlefield[i][j] === 'B')) {
                            cell.classList.add('miss');
                        }
                        else {
                            cell.classList.add('hit');
                        }
                    } else {
                        // cell.textContent = '' 
                    }
                }
                string.appendChild(cell)
            }
        player2Board.appendChild(string)
    }
}