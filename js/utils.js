var gTimerStartInterval;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
  
function startTimer() {
    if (!gTimerStartInterval) {
        gTimerStartInterval = setInterval(incrementSeconds, 1000);
    }
}

function stopTimer() {
    clearInterval(gTimerStartInterval);
    gTimerStartInterval = null;
}

function renderTimer() {
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = gGame.secsPassed;
}

function incrementSeconds() {
  gGame.secsPassed++;
  renderTimer()
}

function initTimer() {
  if (gTimerStartInterval != null) {
    clearInterval(gTimerStartInterval);
    gTimerStartInterval = null;
  }
  gGame.secsPassed = 0;
  renderTimer()
}
