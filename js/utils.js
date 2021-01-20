

// // location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }



// calculate neighbors
function countMineNeighbors(board, cellI, cellJ) {
    var neighborsCount = 0; 

    for (var i = cellI-1; i <= cellI+1; i++) {
        for (var j = cellJ-1; j <= cellJ+1; j++) {
            if (i < 0 || j < 0 || i >= board.length || j >= board.length) continue;
            if (i === cellI && j === cellJ) continue; 
            var cell = board[i][j];
            if(cell.content === MINE) neighborsCount++;
        } 
    }
    return neighborsCount;

    
}