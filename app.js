let width = 7;
let height = 6;
let currPlayer = 1;

const board = [];

const playerTurn = document.querySelector('.playerTurn');


playerTurn.textContent = `Player ${currPlayer}'s Turn`;
playerTurn.style.color = 'lime';

//Board function
function makeBoard() {
	for (let i = 0; i < height; i++) {
		board[i] = [];
		for (let j = 0; j < width; j++) {
			board[i][j] = null;
		}
	}
}

function makeHtmlBoard() {
	const htmlBoard = document.getElementById('board');
	const top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
    top.addEventListener('click', handleClick);
    
	for (let x = 0; x < width; x++) {
		const headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
	}
	htmlBoard.append(top);

	for (let y = 0; y < height; y++) {
		const row = document.createElement('tr');
		for (let x = 0; x < width; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
		}
		htmlBoard.append(row);
	}
}

function findForCol(x) {
	for (let y = height - 1; y >= 0; y--) {
		if (!board[y][x]) {
			return y;
		}
	}
	return null;
}

function placeInTable(y, x) {
	const gamePiece = document.createElement('div');
	gamePiece.classList.add('piece');
	gamePiece.classList.add(`p${currPlayer}`);
	gamePiece.setAttribute('id', `${y}-${x}`);
	document.getElementById(`${y}-${x}`).append(gamePiece);
}

function endGame(msg) {
	setTimeout(function() {
		alert(msg);
	}, 300);
	playerTurn.textContent = `Congratulations Player ${currPlayer}`;
	document.getElementById('column-top').removeEventListener('click', handleClick);
}

function handleClick(evt) {
	let x = +evt.target.id;
	let y = findForCol(x);
	if (y === null) {
		return;
	}

	placeInTable(y, x);
	board[y][x] = currPlayer;

	if (checkForWin()) {
		return endGame(`Player ${currPlayer} wins!`);
	}

	if (board.every((row) => row.every((cell) => cell))) {
		return endGame("I don't know how, but you tied!");
	}

	if (currPlayer === 1) {
		currPlayer = 2;
		playerTurn.textContent = `Player ${currPlayer}'s Turn`;
		playerTurn.style.color = 'blueviolet';
	} else {
		currPlayer = 1;
		playerTurn.textContent = `Player ${currPlayer}'s Turn`;
		playerTurn.style.color = 'lime';
	}
}

function checkForWin() {
	function _win(cells) {
		return cells.every(([ y, x ]) => y >= 0 && y < height && x >= 0 && x < width && board[y][x] === currPlayer);
	}

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			if (_win(horiz)) {
				horiz.forEach(() => {
					document.getElementById(`${y}-${x++}`).style.backgroundColor = 'whitesmoke';
				});
            }
        
			const vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			if (_win(vert)) {
				vert.forEach(() => {
					document.getElementById(`${y++}-${x}`).style.backgroundColor = 'whitesmoke';
				});
			}

			const diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			if (_win(diagDR)) {
				diagDR.forEach(() => {
					document.getElementById(`${y++}-${x++}`).style.backgroundColor = 'whitesmoke';
				});
			}
		
			const diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];
			if (_win(diagDL)) {
				diagDL.forEach(() => {
					document.getElementById(`${y++}-${x--}`).style.backgroundColor = 'whitesmoke';
				});
			}

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
