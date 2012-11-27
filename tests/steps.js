
var testo = require ('../testo');


exports.setUp = function (cb) {
	testo.reset ();
	cb ();
};

exports.setUp = function (cb) {
	console.log ('invoked setup!!!!');
	testo.reset ();
	cb ();
};

exports.test_addAStepToHost_stepsPropertyHasLengthOfOne = function (test) {

	testo.host.step ('the name', function () { });
    
    test.equal (testo.steps.length, 1);
    test.done();
};

exports.test_addAStepToDevice_stepsPropertyHasLengthOfOne = function (test) {

	testo.device.step ('the name', function () { });
	    
	test.equal (testo.steps.length, 1);
	test.done();
};

exports.test_addAStepToDeviceAndHost_stepsPropertyHasLengthOfTwo = function (test) {

	testo.device.step ('the first step', function () {});
	testo.host.step ('the second step', function () {});

	test.equal (testo.steps.length, 2);
	test.done ();
};

function verifyStepNameAndFunc (target, test) {

	var f = function () {};
	target.step ('__the_name__', f);
    
    var step = testo.steps [0];
	test.equal (step.name, '__the_name__', 'the name');
	test.equal (step.func, f, 'the function');

	test.done ();
}

exports.test_addAStepToHost_insertedStepHasCorrectNameAndFunction = function (test) {
	verifyStepNameAndFunc (testo.host, test);
};

exports.test_addAStepToDevice_insertedStepHasCorrectNameAndFunction = function (test) {
	verifyStepNameAndFunc (testo.device, test);
};

exports.test_addAStepToDeviceThenAStepToHost_firstStepInStepsPropertyIsADeviceStep = function (test) {

	testo.device.step ('a device step', function () {});
	testo.host.step ('a host step', function () {});

	var step = testo.steps [0];

	test.equal (step.target, 'device');
	test.done ();
};

exports.test_addAStepToDeviceThenAStepToHost_secondStepInStepsPropertyIsAHostStep = function (test) {

	testo.device.step ('a device step', function () {});
	testo.host.step ('a host step', function () {});

	var step = testo.steps [1];

	test.equal (step.target, 'host');
	test.done ();
};

