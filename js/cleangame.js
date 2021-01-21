
const MINE = '💣';
const FLAG = '🚩';
const EMPTY = ' ';

var gBoard;
var gtimerStartInterval;
var gFirstClickOnCell;

var gLevel = {
    size: 4,
    mines: 2,
}
var gGame = {
    isOn: false,
    isWin: false,
    shownMineCount: 0,
    showCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function init() {
    gGameInit();
    gGame.isOn = true;
    initTimer();
    renderPicture('smileyface')
    gBoard = buildBoard(gLevel.size);
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
    setMinesOnBoard(board)
    setMinesNegCount(board)

    console.table(board)
    return board
}
// every level there is a different size and numbers of mines
function changeLevel(size, mines) {
    gGameInit();
    gLevel.size = size;
    gLevel.mines = mines;
    clearInterval(gtimerStartInterval);
    gtimerStartInterval = null;
    gFirstClickOnCell = null;
    gBoard = null;
    init();

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
            var flag = ""
            if (!cell.isShown && cell.isMark) {
                cell.content = FLAG

            } else if (cell.isShown) {
                if (cell.isMine) {
                    cell.content = MINE
                    debugger
                } else {
                    cell.content = cell.minesAroundCount

                }
            }
            var cellClass = (cell.isShown) ? 'orange' : '';
            strHTML += `<td class="cell${i}-${j} ${cellClass}"
            onclick="cellClicked(${i},${j})" oncontextmenu="markCell(event,${i},${j})">${cell.content}${flag}</td>`;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board-game');
    elBoard.innerHTML = strHTML;
}
// what happend if a cell i clicked
function cellClicked(cellI, cellJ) {
    if (!gGame.isOn) return;
    var cell = gBoard[cellI][cellJ];
    if (cell.isShown || cell.isMarked) return;
    startTimer();
    if (!gFirstClickOnCell) {
        gFirstClickOnCell = {
            location: {
                i: cellI,
                j: cellJ
            }
        };
    }
    if (cell.isMine) {
        console.log('gB', gBoard)
        showAllMines(gBoard);
        // gameOver();
        return;
    }
    if (!cell.isShown) {
        cell.isShown = true;
        renderCell({ i: cellI, j: cellJ }, cell.minesAroundCount);
        gGame.showCount++;
    }
    // if (!cell.isMarked) {
    //     cell.isMarked = true;
    //     gGame.markedCount++;
    // }
    // renderBoard(gBoard);
    // ceckIfGameOver();
    // ceckGameOver();

    // what happened when a cell is mark
}
function markedCell(cellI, cellJ) {
    var cell = gBoard[cellI][cellJ];
    cell = gGame.content = FLAG
    cell.isMarked = (cell.isMarked) ? false : true;
    if (cell.isMarked) {
        gGame.markedCount++;
    } else {
        gGame.markedCount--;
    }
    renderCell({ i: cellI, j: cellJ }, FLAG);
}
function markCell(elEvent, cellI, cellJ) {
    elEvent.preventDefault();
    var cell = gBoard[cellI][cellJ];
    cell.isMarked = (cell.isMarked) ? false : true;
    if (cell.isMarked) {
        gGame.markedCount++;
    } else {
        gGame.markedCount--;
    }
    renderCell({ i: cellI, j: cellJ }, FLAG);
}

// mines function area
// counting all neighbors around the cell
function countMineNeighbors(board, cellI, cellJ) {
    var neighborsCount = 0;

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i < 0 || j < 0 || i >= board.length || j >= board.length) continue;
            if (i === cellI && j === cellJ) continue;
            var cell = board[i][j];
            if (cell.isMine) neighborsCount++;
        }
    }
    return neighborsCount;
}
function setMinesNegCount(board) {
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        for (let j = 0; j < row.length; j++) {
            var cell = row[j];
            cell.minesAroundCount = countMineNeighbors(board, i, j);
        }
    }
    return board;
}
function setMinesOnBoard(board) {
    for (var i = 0; i < gLevel.mines; i++) {
        console.count('inside set on board')
        console.log('this is', gGame.shownMineCount)
        console.log('this is glevel mines:', gLevel.mines)
        console.log('----------------------------')
        var randomI = getRandomInt(0, board.length - 1);
        var randomJ = getRandomInt(0, board.length - 1);
        var cell = board[randomI][randomJ];
        if (cell.isMine) {
            i--
            continue;
        }
        // if (randomI === gFirstClickOnCell.location.i && randomJ === gFirstClickOnCell.location.j) continue;

        cell.content = MINE;
        gGame.shownMineCount++;
        cell.isMine = true;
    }

}
function showAllMines(board) {
    for (var i = 0; i < board.length; i++) {
        var row = board[0]
        for (var j = 0; j < row.length; j++) {
            var cell = board[i][j];
            // if (cell.isMarked) continue;
            if (cell.isMine) {
                console.log('mine:', cell.isMine)
                cell.isShown = true;
                renderCell({ i: i, j: j }, MINE);
            }
        }

    }
}
function showAllEmptyNeighbors(board, cellI, cell) {
    var cell = board[cellI][cellJ];
    if (cell.content !== EMPTY) return;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i < 0 || j < 0 || i >= board.length || j >= board.length) continue;
            if (i === cellI && j === cellJ) continue;
            var currNeighbor = board[i][j];
            if (currNeighbor.content === MINE || currNeighbor.isMarked) continue;
            if (!currNeighbor.isShown) {
                currNeighbor.isShown = true;
                gGame.shownCount++;
            }
        }
    }
}
function hideCellAndNeighbors(board, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i < 0 || j < 0 || i >= board.length || j >= board.length) continue;
            var cell = board[i][j];
            cell.isShown = false;
        }
    }
}
function ceckIfGameOver() {
    var numCells = gLevel.size ** 2;
    var allShownOrMines = gGame.shownCount + gGame.minesCount;
    var allShownOrFlaged = gGame.shownCount + gGame.markedCount;
    if (allShownOrFlaged === numCells && allShownOrMines === numCells) {
        gGame.isWin = true;
        gameOver();
    }
}
function gameOver() {
    gGame.isOn = false;
    if (gGame.isWin) {
        renderPicture('winnerface')
    } else {
    renderPicture('shockedsmiley')
    }
    gGameInit();
    clearInterval(gtimerStartInterval)
    gtimerStartInterval = null;
    gFirstClickOnCell = null;
    gBoard = null;
    alert('game over!')

}
function gGameInit() {
    gGame = {
        isOn: false,
        isWin: false,
        shownMineCount: 0,
        showCount: 0,
        markedCount: 0,
        secsPassed: 0
    };
}

    function renderPicture(imgName) {
    if (gGame.isOn) imgName = 'smileyface';
    var strHtml = '';
    elSmileyContainer = document.querySelector('.smiley-container')
    strHtml += `<img onclick="changeLevel(${gLevel.size}, ${gLevel.mines})" src="img/${imgName}.jpg" width="40" height="40"/>`;
    elSmileyContainer.innerHTML = strHtml;
}
