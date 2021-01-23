
const MINE = '💣';
const FLAG = '🚩';
const WRONG_MARK = '🤦‍♂️';
const EMPTY = ' ';
var gBoard;
var gFirstClickOnCell;

var gLevel = {
    size: 4,
    mines: 2,
}

var gGame = {
    isOn: false,
    isWin: false,
    mineCount: 0,
    showCount: 0,
    markedCount: 0,
    secsPassed: 0,
}

function init() {
    gGame = {
        isOn: true,
        isWin: false,
        mineCount: 0,
        showCount: 0,
        markedCount: 0,
        secsPassed: 0,
    };
    gFirstClickOnCell = false;
    initTimer();
    renderPicture('smileyface.jpg');
    gBoard = buildBoard(gLevel.size);
    renderMineCount(gLevel.mines);
    renderBoard(gBoard);
}

// 1.build the board - the size is from glevel
function buildBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            var cell = {
                content: '',
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
            board[i][j] = cell;
        }
    }
    console.table(board)
    return board
}

// every level there is a different size and numbers of mines
function changeLevel(size, mines) {
    gLevel.size = size;
    gLevel.mines = mines;
    init();
}


function expandShown(board, cellI, cellJ) {
    var cell = board[cellI][cellJ]
    cell.isShown = true;
    gGame.showCount++;
    if (cell.minesAroundCount > 0) {
        cell.content = cell.minesAroundCount;
    }

    renderCell(cellI, cellJ, cell.content)
    if (cell.minesAroundCount === 0) {
        for (var i = cellI-1; i <= cellI+1; i++) {
            for (var j = cellJ-1; j <= cellJ+1; j++) {
                if (i === cellI && j === cellJ) continue;
                if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) continue;
                if (board[i][j].isShown || board[i][j].isMarked) continue;
                expandShown(board, i, j);
            }
        }
    }

    gGame.isWin = checkIfWin();
    if (gGame.isWin) {
        gameWon();
    }
}

// what happend if a cell i clicked
function cellClicked(cellI, cellJ) {
    if (!gGame.isOn) return;

    var cell = gBoard[cellI][cellJ];
    
    if (cell.isShown || cell.isMarked) return;

    if (!gFirstClickOnCell) {
        gFirstClickOnCell = true;
        handleFirstClick(cellI, cellJ);
    }

    if (cell.isMine) {
        gameOver();
        return;
    }

    expandShown(gBoard, cellI, cellJ);
}

function handleFirstClick(cellI,cellJ) {
    renderPicture('ingamesmiley.png');
    setMinesOnBoard(cellI,cellJ)
    setMinesNeighborsCount()
    startTimer()
}
function markCell(elEvent, cellI, cellJ) {
    elEvent.preventDefault();
    var cell = gBoard[cellI][cellJ];
    if (cell.isShown) return; // user cannot mark shown cells

    if (cell.isMarked) { // if cell is marked, then unmark
        gGame.markedCount--;
        renderMineCount(gLevel.mines - gGame.markedCount)
        cell.isMarked = false;
        renderCell(cellI, cellJ, EMPTY);
    } else if (gGame.markedCount < gGame.mineCount) {
        gGame.markedCount++;
        renderMineCount(gLevel.mines - gGame.markedCount)
        cell.isMarked = true;
        renderCell(cellI, cellJ, FLAG);
    } else {
        return;
    }
}

// mines function area
// counting all neighbors around the cell
function countMineNeighbors(cellI, cellJ) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i < 0 || j < 0 || i >= gBoard.length || j >= gBoard.length) continue;
            if (i === cellI && j === cellJ) continue;
            if (gBoard[i][j].isMine) neighborsCount++;
        }
    }
    return neighborsCount;
}

function setMinesNeighborsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i];
        for (let j = 0; j < row.length; j++) {
            var cell = row[j];
            cell.minesAroundCount = countMineNeighbors(i, j);
        }
    }
}

function setMinesOnBoard(cellI, cellJ) {

    var currentNumberOfMines = 0;
    var firstClickCell = gBoard[cellI][cellJ]
    while (currentNumberOfMines < gLevel.mines) {
        var randomI = getRandomInt(0, gBoard.length - 1);
        var randomJ = getRandomInt(0, gBoard.length - 1);
        var cell = gBoard[randomI][randomJ];

        if (!cell.isMine && cell != firstClickCell) {
            cell.content = MINE;
            cell.isMine = true;
            currentNumberOfMines++;
        }
    }

    gGame.mineCount = currentNumberOfMines;
}

function showAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[0]
        for (var j = 0; j < row.length; j++) {
            var cell = gBoard[i][j];
            if (cell.isMine && !cell.isMarked) {
                renderCell(i, j, MINE);
            } else if (cell.isMarked && !cell.isMine) {
                renderCell(i, j, WRONG_MARK);
            }
        }
    }
}

function checkIfWin() {
    var numCells = gBoard.length * gBoard[0].length;
    if (numCells - gGame.showCount === gGame.mineCount) {
        return true;
    } else {
        return false;
    }
}

function gameWon() {
    stopTimer();
    showAllMines();
    gGame.isOn = false;
    renderPicture('winningsmiley.png');
}

function gameOver() {
    gGame.isOn = false;
    alert('game over!')
    renderPicture('shockedsmiley.jpg');
    showAllMines();
    stopTimer();
}

function renderPicture(imgName) {
    elSmileyContainer = document.querySelector('.smiley-container')
    elSmileyContainer.innerHTML = `<img src="img/${imgName}" width="120" height="120"/>`;
}

function renderMineCount(count) {
    var elMinesCount = document.querySelector('.mines-count');
    elMinesCount.innerHTML = count;
}

function renderCell(cellI, cellJ, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${cellI}-${cellJ}`);
    var cellShown = gBoard[cellI][cellJ].isShown;
    if (cellShown) {
      elCell.classList.add('cell-shown')
      elCell.classList.remove('cell-not-shown')
    } else {
      elCell.classList.add('cell-not-shown')
      elCell.classList.remove('cell-shown')
    }
    elCell.innerHTML = value;
}

// render board to the DOM
function renderBoard(board) {
    console.log(board)
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {

            var cell = board[i][j];
            cell.content = EMPTY

            if (!cell.isShown && cell.isMark) {
                cell.content = FLAG
            } else if (cell.isShown) {
                if (cell.isMine) {
                    cell.content = MINE
                } else if (cell.minesAroundCount > 0) {
                    cell.content = cell.minesAroundCount
                }
            }

            var cellClass = (cell.isShown) ? 'cell-shown' : 'cell-not-shown';
            strHTML += `<td class="cell${i}-${j} ${cellClass}"
            onclick="cellClicked(${i},${j})" oncontextmenu="markCell(event,${i},${j})">${cell.content}</td>`;
        }
        strHTML += '</tr>';
    }
    document.querySelector('.board-game').innerHTML = strHTML;
}
