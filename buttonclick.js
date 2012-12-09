/*
 * A simple test that fetches a list of items from the webserver 
 * and displays them in a UITableView.
 */

var testo = require ('./testo');

var host = testo.host;
var device = testo.device;

// This step is executed on the device. Device steps are always passed
// the target, app, and next object as their final three arguments.
device.step ('press click button', function (target, app, next) {
	next ();
});


device.step ('verify text is set to clicked', function (target, app, next) {
/*
	var target = UIATarget.localTarget();

	var window = UIATarget.localTarget().frontMostApp().mainWindow ();
	var button = window.buttons () [0];

	button.tap ();
*/
	console.log ('using the log function, gawd this is nice!');

	setTimeout (function () { 
		console.log ('in the setTimeout callback');
		setTimeout (function () { 
			console.log ('in the other setTimeout callback');
			console.log ('calling next');
			next ();
		}, 0);
	}, 0);
});
