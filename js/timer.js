function Timer() {
  this.time = null;
}

Timer.MAX_TIME_MS = 3600000;

Timer.getFormatted = function(timeMillisec) {
  function pad(num) {
    return (num < 10 ? '0' : '') + num;
  }
  var totalSec = parseInt(timeMillisec / 1000, 10);
  return [
    pad(parseInt(totalSec / 60, 10) % 60),
    pad(totalSec % 60),
    pad(parseInt(timeMillisec % 1000 / 10, 10)),
  ].join(':');
}

Timer.prototype.start = function() {
  if (this.time === null) {
    this.time = this._getNow();
  }
}

Timer.prototype.reset = function() {
  this.time = null;
}

Timer.prototype.getTime = function() {
  var passed = 0;
  if (this.time !== null) {
    passed = this._getNow() - this.time;
    // Prevent overflow
    passed = passed < Timer.MAX_TIME_MS ? passed : Timer.MAX_TIME_MS - 10;
  }
  return passed;
}

Timer.prototype._getNow = function() {
  return (new Date()).valueOf();
}
