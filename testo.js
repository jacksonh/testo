

var hostClass = function () {
	
	this.step = function (name, func) {
		console.log ('host registered: ' + name);
	};

	this.asyncStep = function (name, func) {
		console.log ('host registered async: ' + name);
	};
};

var deviceClass = function () {
	
	this.step = function (name, func) {
		console.log ('device registered: ' + name);
	};

	this.asyncStep = function (name, func) {
		console.log ('device registered async: ' + name);
	};
};


exports.createHost = function () {

	return new hostClass;
};


exports.createDevice = function () {

	return new deviceClass;
};

