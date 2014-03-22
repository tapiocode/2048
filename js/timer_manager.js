function TimerManager() {
  this.timer = new Timer;
  this.timesBest = new TimesBest(LocalStorageManager);
  this.intervalId = null;
  this.timerClockElem = document.getElementById('timer-clock');
  this.timesBest.init();
}

TimerManager.prototype.start = function() {
  this.timer.start();
  this.startDrawingTime();
}

TimerManager.prototype.stop = function() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
  this.intervalId = null;
}

TimerManager.prototype.reset = function() {
  this.stop();
  this.timer.reset();
  this.timerClockElem.textContent = Timer.getFormatted(0);
}

TimerManager.prototype.continue = function() {
  this.startDrawingTime(true);
}

TimerManager.prototype.tileMerged = function(tileValue) {
  var time = this.timer.getTime();
  this.timesBest.setBlockTime(tileValue, time);
}

TimerManager.prototype.startDrawingTime = function(cont) {
  var self = this;
  if (this.intervalId === null || cont) {
    this.intervalId = setInterval(function() {
      self.timerClockElem.textContent = Timer.getFormatted(self.timer.getTime());
    }, 50);
  }
}


