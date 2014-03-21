function TimesBest() {
	this.timesContainer = {};
	this.notifierElem = document.getElementById('times-best-notifier');
}

TimesBest.prototype.init = function() {
	// Values of blockSizes correspond to the divs on index.html
	var blockSizes = ['64', '128', '256', '512', '1024', '2048'];
	for (var i = 0; i < blockSizes.length; i++) {
		this.timesContainer['times-best-' + blockSizes[i]] = 0;
	}
	this.renderTimes();
}

TimesBest.prototype.setBlockTime = function(blockSize, timeMillisec) {
	var id = 'times-best-' + blockSize;
	if (!this.timesContainer.hasOwnProperty(id) ||
		(this.timesContainer[id] > 0 &&
		this.timesContainer[id] < timeMillisec)) {
		// If the container does not have such a block
		// or new time is slower than the previous
		return;
	}
	// Otherwise store the new time and flash a notification
	this.timesContainer[id] = timeMillisec;
	this.flash(blockSize, timeMillisec);
	this.renderTimes();
}

TimesBest.prototype.renderTimes = function() {
	for (var i in this.timesContainer) {
		document.getElementById(i).textContent = Timer.getFormatted(this.timesContainer[i]);
	}
}

TimesBest.prototype.flash = function(blockSize, timeMillisec) {
	// Display a short notification on top of the times
	var notification = blockSize + ' ' + Timer.getFormatted(timeMillisec),
		self = this;
	console.log(notification);
	if (!document.querySelectorAll ||
		typeof document.querySelectorAll !== 'function') {
		return;
	}
	this.notifierElem.textContent = notification;
	this.notifierElem.className = 'notify';
	setTimeout(function() {
		self.notifierElem.className = '';
	}, 2000);
}