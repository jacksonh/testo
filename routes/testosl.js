
var testo = require ('../testo'),
	fs = require ('fs'),
	temp = require ('temp'),
	http = require ('http'),
	exec = require('child_process').exec,
	mustache = require('mustache'),
	fruitstrap = require ('../fruitstrap');


var state = {
	
	status: 'none',

	step: 0,
	test: null,
	context: null,

	app: null,
	device: null
};


var executeTest = function (app, test, device) {

	state.status = 'starting';
	state.app = app;
	state.test = test;
	state.device = device;

	state.step = 0;

	testo.reset ();

	// For now just load the fucking test. In the future I think 
	// we should probably download the test into a temp directory
	// and execute it from there, that way the nodes don't have to
	// have any knowledge of the tests

	var t = require ('../' + test);

	console.log ('testo steps: ' + testo.steps.length);

	createInstrumentsScript (function (scriptPath) {
		startInstruments (scriptPath);
	});
}

var createInstrumentsScript = function (cb) {

	var path = temp.path ({suffix: '.js'});
	console.log ('file: ' + path);

	var data = {};
	fs.readFile('./instruments-script.js.mustache', function (err, template) {
    	var output = mustache.render(template.toString (), data);
    	console.log ('script_data\n' + output);

    	fs.writeFile (path, output, function (err) {
			cb (path);
		});
	});
}

var startInstruments = function (path) {

	var execute = 'instruments ' +
				  '-w ' + state.device + 
				  ' -l ' + testo.timeout + 
				  ' -t ' + testo.traceTemplate + 
				  ' ' + state.app + 
				  ' -e UIASCRIPT ' + path;

	console.log (execute);
	
	var instruments = exec (execute, function (error, stdout, stderr) {
		console.log ('error:  '  + error);
		console.log ('stdout: '  + stdout);
		console.log ('stderr: '  + stderr);

		state.status = 'waiting';
	});
}

exports.devices =  function (req, res) {

	fruitstrap.getDeviceList (function (devices) {
		res.json (devices);
	});
};


exports.next = function (req, res) {

	var nargs = req.body.nargs
	var ndata = req.body.ndata;
	var nerror = req.body.nerror;

	console.log ('current step: ' + testo.steps [state.step].func);
	var step = {
		name: 'the next step',
		func: testo.steps [state.step].func.toString ()
	};

	res.json (step);
};

exports.state = function (req, res) {

	res.json (state);
};
	
exports.begin = function (req, res) {

	var app = req.body.app;
	var test = req.body.test;
	var device = req.body.device;

	if (app == null || test == null || device == null) {
		console.log ('missing required parameter');
		res.send (500);
		return;
	}

	if (state.status != 'waiting') {
		console.log ('slave is not in wait state: ' + state);
		res.send (500);
		return;
	}

	executeTest (app, test, device);

	res.send (200);
};


state.status = 'waiting';


