
var Console = function () {
	UIALogger.logDebug ('created the console');
};

Console.prototype.log = function (str) {
	UIALogger.logDebug (format.apply (this, arguments));
};

//
// Alias all these guys so its easier for people to C&P code
//
Console.prototype.info = Console.prototype.log;
Console.prototype.warn = Console.prototype.log
Console.prototype.error = Console.prototype.log;


Console.prototype.dir = function (object) {
	this.log ('%s:', object);
	for (var att in object) {
		var val = (typeof object [att] == 'function') ? 'function' : object [att];
		this.log ('  %s: %s', att, val);
	}
};


//
// Taken from node.js
//
var formatRegExp = /%[sdj%]/g;
var format = function(f) {
  if (typeof f !== 'string') {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j': return JSON.stringify(args[i++]);
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (x === null || typeof x !== 'object') {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};