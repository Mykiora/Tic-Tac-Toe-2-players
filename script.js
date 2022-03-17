// ------- DOM related functions -------
function setText(element, newText) {
    element.innerText = newText.toString();
}

function setDisplay(element, mode) {
    switch(mode) {
        case 'show':
            element.setAttribute('style', 'display: block');
            break;
        case 'hide':
            element.setAttribute('style', 'display: none');
            break;
        default:
            throw 'setDisplay: Invalid Parameter - Please choose between \'show\' and \'hide\'';
    }
}

// ------- Game related functions -------
function insertLetter(cell, symbol) {
    switch(symbol) {
        case 'X':
            cell.classList.add('X');
            break;
        case 'O':
            cell.classList.add('O');
            break;
        default:
            throw 'insertLetter: Invalid Parameter - Please choose between X and O';
    }
}

function isWinner(board, symbol) {
    return (board[0].classList.contains(symbol) && board[1].classList.contains(symbol) && board[2].classList.contains(symbol))
    || (board[3].classList.contains(symbol) && board[4].classList.contains(symbol) && board[5].classList.contains(symbol))
    || (board[6].classList.contains(symbol) && board[7].classList.contains(symbol) && board[8].classList.contains(symbol))
    || (board[0].classList.contains(symbol) && board[3].classList.contains(symbol) && board[6].classList.contains(symbol))
    || (board[1].classList.contains(symbol) && board[4].classList.contains(symbol) && board[7].classList.contains(symbol))
    || (board[2].classList.contains(symbol) && board[5].classList.contains(symbol) && board[8].classList.contains(symbol))
    || (board[0].classList.contains(symbol) && board[4].classList.contains(symbol) && board[8].classList.contains(symbol))
    || (board[2].classList.contains(symbol) && board[4].classList.contains(symbol) && board[6].classList.contains(symbol));
}

function boardIsFull(board) {
    console.log(board.every(cell => cell.classList.contains('X') || cell.classList.contains('O')))
    return board.every(cell => cell.classList.contains('X') || cell.classList.contains('O'));
}

function resetBoard(board) {
    board.forEach(cell => {
        if (cell.classList.contains('X')) {
            cell.classList.remove('X');
        } else {
            cell.classList.remove('O');
        }
    })
} 

// ------- MAIN FUNCTION -------
function main() {
    // ------- DOM Variables -------
    const board = Array.from(document.querySelectorAll('.cell'));
    const winner = document.querySelector('.winner'); 
    const restartButton = document.querySelector('.restart');

    // ------- Other Variables -------
    let isXturn = true;

    // ------- Event Listeners -------
    board.forEach(cell => {
        cell.addEventListener('click', function() {
            if (!boardIsFull(board)) {
                if (!isWinner(board, 'X') && !isWinner(board, 'O')) {
                    if (isXturn) {
                        insertLetter(cell, 'X');
                        isXturn = false;
                    } else {
                        insertLetter(cell, 'O');
                        isXturn = true;
                    }
                }
                if (isWinner(board, 'X')) {
                    setText(winner, 'X\'s wins !');
                    setDisplay(restartButton, 'show');
                }
                else if (isWinner(board, 'O')) {
                    setText(winner, 'O\'s wins !');
                    setDisplay(restartButton, 'show');
                }
            }
             
            if (boardIsFull(board)) {
                setText(winner, 'Draw Game !');
                setDisplay(restartButton, 'show');
            }
        })
    })

    restartButton.addEventListener('click', function() {
        resetBoard(board);
        setDisplay(restartButton, 'hide');
        setText(winner, '');
        isXturn = true;
    })
}

main();