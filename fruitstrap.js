
var exec = require('child_process').exec;

exports.getDeviceList = function (complete) {

	var options = {};
	var cmd = './bin/fruitstrap --quiet --timeout 1 list-devices';
	console.log ('cmd:  ' + cmd);
	var instruments = exec (cmd, function (error, stdout, stderr) {
		console.log ('error:  '  + error);
		console.log ('stdout: '  + stdout);
		console.log ('stderr: '  + stderr);

		var list = [];
		var slines = stdout.split ('\n');

		slines.forEach (function (l) {
			if (l.length > 0)
				list.push (l);
		});

		complete (list);
	});
};

