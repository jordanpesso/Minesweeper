function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
  }

//   function renderCell(cell, value) {
//     // Select the elCell and set the value
//     var elCell = document.querySelector(`.cell${i}-${j}`);
//     elCell.innerHTML = value;
//   }
  
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

function getTime() {
    return Date.now();
}

function startTimer() {
    if (!gtimerStartInterval) {
        gStartTimer = getTime();
        gtimerStartInterval= setInterval(renderTimer, 10);
    }
}

function renderTimer() {
    var timer = getTime() - gStartTimer;
    var time = timeFormatter(timer);
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = time;
}

function timeFormatter(timeInMilliseconds) {
    var time = new Date(timeInMilliseconds);
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();

    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
        seconds = '0' + seconds;
    }

    while (milliseconds.length < 3) {
        milliseconds = '0' + milliseconds;
    }

    return minutes + ' : ' + seconds;

}
function initTimer() {
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = '00 : 00';
}