
/*
 * A simple test that fetches a list of items from the webserver 
 * and displays them in a UITableView.
 */

var testo = require ('./testo');

var host = testo.host;
var device = testo.device;
var webserver = testo.createServer();

//
// SETTING UP THE TEST ENVIRONMENT
//

// We can copy files to/from the device in the test setup or 
// during test execution
device.fs.copyTo ('Resources/foo.dat', 'Documents/foo.dat');

// Sets the app user preference prior to running. This allows
// us to update local app settings, to do things like point  
// to the test webserver during the test or enter a diagnostics mode.
device.settings.setValueForKey (webserver.host, 'webservices_host');

//
// INTERACTING WITH WEBSERVERS
//

// testo has a builtin web server, this allows us to write fully contained
// tests that interact with expected data from the server. For example,
// if you were writing a twitter client, you could have testo pull down
// a set of known data per-test. Having the sample data in the same file
// as the actual test allows for things to be nicely self contained.

// Returns a sample feed
var feed;
webserver.get ('/feed/', function (req, res) {
	res.send (JSON.stringify (feed));
});

// Any unmatched requests can be proxied to another server, this 
// makes it easy to mock pieces of a webservices without having to
// build functionality for every other webcall
webserver.proxyUnknownTo ('http://mytestserver.com');


// 
// TEST STEPS
//

// Tests are mostly a series of steps, executed on the host
// or on the iOS device. Similar to node's connect framework,
// steps take a next function, used to signify the step is 
// complete.

// Steps are executed in the order that the are specified in
// the test script file (this file). 

// This step creates the feed on the host machine. This is an 
// obviously silly way of doing things, but it shows testo's 
// ability to execute steps in sequence.
host.step ('create feed', function (next) {
	feed = { items: ['a', 'b', 'c', 'd']};
	next ();
});

// This is an example of a test that simumlates async
// functionality, next is invoked in a callback function.
// 
// This step also displays the next function's ability to 
// capture and forward arguments to subsequent steps. 
// Note that the results of the somethingAsync method
// are passed to next. The results are then passed as 
// an argument to the next step. Since the next step
// is on device, the arguments are serialized as json 
// so they can be passed to the device.
host.step ('do something async', function (next) {

	somethingAsync (function (results) {
		next (results);
	});
});

// This step is executed on the device. Device steps are always passed
// the target, app, and next object as their final three arguments.
device.step ('press sync button', function (feeditems, target, app, next) {

	// testo uses mechanic.js to give tests a jquery-like selector syntax 
	// for interacting with UIAutomation items.
	$('#sync_button').click ();
	next (feeditems);
});


device.step ('verify feed items', function (feeditems, target, app, next) {
    var cell_count = $('#feed_table').find ('cell').size ();
        
    // If an assert fails on device, it is serialized, along with a stacktrace
    // and sent back to the host for reporting. 
    assertEquals (feeditems.length, 
    	cells_count, 
    	"The previous cell lengths does not equal the post synced cell length");
	
	next ();
});


var somethingAsync = function (completed) {
	completed (feed);
};
