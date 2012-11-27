
var testo = require ('../testo');


exports.group = {

	setUp: function (cb) {
		console.log ('invoked setup!!!!');
		testo.reset ();
		cb ();
	},

	test_addAStepsToHost_stepsPropertyHasLengthOfOne: function (test) {

		testo.host.step ('the name', function () { });
    
    	test.equal (testo.steps.length, 1);
    	test.done();
	},

	test_addAStepsToDevice_stepsPropertyHasLengthOfOne: function (test) {

		testo.device.step ('the name', function () { });
	    
	    test.equal (testo.steps.length, 1);
	    test.done();
	}

};

