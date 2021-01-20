const MINE = '💣';
const FLAG = '🚩';
const EMPTY = ' ';

var gBoard;
var gtimerStart;
var gFirstClickOnCell;

var gLevel = {
    size: 4,
    mines: 2,
}
//keep and update the current game state
// isOn: true = let the user play
// shownCount = How many cells are shown
// markedCount = How many cells are marked (with a flag)
// secsPassed:How many seconds passed
var gGame = {
    isOn: false,
    isWin: false,
    shownMineCount: 0,
    showCount: 0,
    markedCount: 0,
    secsPassed: 0
}

// function init start when the page is loaded

function init() {
    gGame.isOn = true;
    // todo: change smile ? 
    // todo: timer?
    buildBoard(gLevel.size);
    renderBoard(gBoard);
}

// in the board there is a function that set mines
// in random location
function buildBoard(size) {
    var gboard = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            var cell = {
                gameElement: '';
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            gBoard[i][j] = cell;

        }
    }
    // setMinesNegsCount()
    console.log(board)
    return board
}

function changeLevel(size, mines) {
    gLevel.size = size;
    gLevel.mines = mines;
    clearInterval(gtimerStart)
    gFirstClickOnCell = 0;
    init();
}
// this function Count mines around each cell 
// and set the cell's minesAroundCount
function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            if (cell.isMine) continue;
            cell.minesAroundCount = countNeighbors(board, cellI, CellJ);
            if {cell.minesAroundCount !===0) {
                cell.content = minesAroundCount.toString 
            }
        }
    }
    return board;
    }
    // function setMinesOnBoard

    function renderBoard(board) {
        var strHTML = '<table border="3"><tbody>';
        // create rows 
        for (var i = 0; i < board.length; i++) {
            strHTML += '<tr>';
            // create cols
            for (var j = 0; j < board[0].length; j++) {
                var cell = board[i][j];
                var content = (cell.isShown) ? cell.content : EMPTY;
                var flag = (cell.isMarked) ? FLAG : '';
                var cellClassApper = (cell.isShown) ? 'blue' : '';
                strHTML += `<td class="cell-${i}-${j}" class="${cellClassApper}" onclick="cellClicked(${i},${j})"${content}${flag}' + cell + ' </td>';`
                strHTML += '\t</td>\n';
            }
            strHTML += '</tbody></table>';
        }
        console.log('strHTML is:');
        console.log(strHTML);
        var elBoard = document.querySelector('.board');
        elBoard.innerHTML = strHTML;


    }
    // when the cell<td> is clicked

    function cellClicked(cellI, cellJ) {
        if(!gGame.isOn) return;
        var cell =gBoard[cellI][cellJ];
        if(cell.isShown || cell.isMarked) return;
        if (!gFirstClickOnCell) {
            location:{ i: cellI, j: cellJ }

        };


        }

        setMinesOnBoard(gBoard);

        setMinesNeighborsCount(gBoard);
    }

        if(cell.isMine) {
            RevealAllMines(gBoard);
            renderBoard(gBoard);
            return;
        }
        if (!cell.isShown) {
            cell.isShown = true;
            gGame.showCount++;
        }
        
    }

    function  RevealAllMines(gBoard) {

    }
    // flag the cells = on right click
    // Called on right click to mark a cell (suspected to be a mine)
    // todo: how to hide the context menu on right click
    function cellMarked(elCell) {

    }

    // game over - all the mines are marked && other cells are shown
    function checkGameOver() {

    }

//if user clicks a cell with no mines around
// the function need to open the cell and the neighbors.
// *step1= onle non-mine 1ST dgree neighbors.
function expandShown(board, elCell, i, j) {

}

function setMinesOnBoard(Board){
    for (var i = 0; i < board.length; i++) {
            var randI = getRandomInt(0, board.length-1);
        for (var j = 0; j < row.length; j++) {
            var randJ = getRandomInt(0, board.length-1); 
        }
        var cell = board[randI][randJ];

    if (cell.isMine) continue;
    if (gFirstClickOnCell) continue;
    if (randI === gFirstClickOnCell.location.i && randJ === gFirstClickOnCell.location.j) continue;
    }

    cell.content = MINE;
    gGame.minesCount++;
    cell.isMine = true;

}