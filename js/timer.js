function Timer() {
  this.time = null;
}

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
  if (this.time === null) {
    return 0;
  }
  return this._getNow() - this.time;
}

Timer.prototype._getNow = function() {
  return (new Date()).valueOf();
}
