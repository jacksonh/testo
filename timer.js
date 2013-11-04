

var timers = [];

	var setTimeout = function (func, ms) {
		var expires = new Date ().getTime ();
		UIALogger.logDebug ('setting timeout to expire: ' + expires + ' on this: ' + this.timers + ' status: ' + this.status);
		this.timers.push ({
			func: func,
			expires: expires
		});
	};

	var clearTimeout = function (t) {

	};

	var tick = function () {
		var timers = this.timers;
	};
