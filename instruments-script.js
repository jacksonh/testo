
var hostUrl = 'http://127.0.0.1:3000/sl/next';

var performTaskWithPathArgumentsTimeout = function (task, args, timeout) {
	console.log ('performing task:  ' + task + 'with args: ' + args);
	return {
		exitCode: 0,
		stdout: JSON.stringify ({ foo: 'bar' })
	}
};

var log = function (text) {
	console.log (text);
};

var getNext = function (data) {

    // The arugments sent to curl
    var args = [];
   	args.push ("-d '" + JSON.stringify (data) + "'");
	args.push (hostUrl);

    var waiting = true;
    while (waiting) {
    	// TODO: figure out what error we get from this method on timeout. 
    	// We already handle curl's timeout but we need to handle the hosts timeout too.
	    var result = performTaskWithPathArgumentsTimeout ("/usr/bin/curl", args, 100);

	    // timeout error, just retry
	    if (result.exitCode == 28) {
	    	continue;
	    }

	    if (result.exitCode != 0) {
	        log ("exitCode: " + result.exitCode);
	        log ("stdout: " + result.stdout);
	        log ("stderr: " + result.stderr);
	    
	        throw 'Unable to send host message.';
	    }
	    
	    if (result.stdout.length > 0) {
	        log ("stdout: " + result.stdout);
	        var res = JSON.parse (result.stdout);
	        log ("object: " + JSON.stringify (res));
	    
	        return res;
	    }
	}
};

var next = function () {

    var data = 	{};

    if (arguments.length > 0) {
    	data.nargs = [];
    	for (var i = 0; i < arguments.length; i++) {
    		data.nargs [i] = JSON.stringify (arguments [i]);
    	}
    }

    getNext (data);
};

var failed = function (reason) {

	var data = {};
	data.nerror = reason;

	getNext (data);
};

next ({ test: 'one' }, 'test two', 'test three');

failed ('fucking hell');
