
var steps;

function addStep (name, target, ctx, func) {
	var step = {
		name: name,
		target: target,
		context: ctx,
		func: func
	};
	steps.push (step);
	return step;
}

var hostClass = function () {
	
	this.step = function (name, func) {
		console.log ('host registered a step.');

		return addStep (name, 'host', {},  func);
	};
};

var deviceClass = function () {
	
	this.step = function (name, func) {
		console.log ('device registered a step.');

		return addStep (name, 'device', {},  func);
	};
};

exports.steps = steps;
exports.host = new hostClass;
exports.device = new deviceClass;

exports.reset = function () {
	console.log ('reseting the steps');
	exports.steps = steps = [];
};

exports.reset ();