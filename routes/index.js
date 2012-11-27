

var testosl = require('./testosl');

module.exports = function (app) {

	app.get ('/sl/devices', testosl.devices);
	app.get ('/sl/state', testosl.state);
	app.post ('/sl/begin', testosl.begin);
	app.post ('/sl/next', testosl.next);
};

