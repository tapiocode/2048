function TimesBest(StorageManager) {
	this.storageManager	= new StorageManager;
	this.keyBestTimes	= "bestTimes";
	this.timesContainer	= {};
	this.notifierElem	= document.getElementById('times-best-notifier');
}

TimesBest.prototype.init = function() {
	// Values of blockSizes correspond to the divs on index.html
	var storedBestTimes = JSON.parse(this.storageManager.get(this.keyBestTimes) || "{}"),
		blockSizes = ['64', '128', '256', '512', '1024', '2048'],
		id;
	for (var i = 0; i < blockSizes.length; i++) {
		id = 'times-best-' + blockSizes[i];
		this.timesContainer[id] = storedBestTimes[id] || 0;
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
	var times = this.timesContainer;
	for (var i in times) {
		document.getElementById(i).textContent = Timer.getFormatted(times[i]);
	}
	this.storageManager.set(this.keyBestTimes, JSON.stringify(times));
}

TimesBest.prototype.flash = function(blockSize, timeMillisec) {
	// Display a short notification on top of the times
	var notification = blockSize + ' ' + Timer.getFormatted(timeMillisec),
		self = this;
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