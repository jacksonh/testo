testo
=====

This is a framework for running iOS acceptance tests. Basically it runs UIAutomation tests inside of node-unit and allows for some communication between node-unit ("the server") and the instruments ("the device").

The sort of nice thing about this is you get a real test harness around all the UIAutomation stuff. You also get some IPC, so errors that generate stacks in instruments will be sent back to node-unit and logged properly. Tests can also have multiple steps that interact betweent the host and the device. So like device ('click button), host ('verify database was changed');

I had planned on commercializing testo and making it into a real product, but decided against it. So here it is. 

Its unfinished and undocumented. Some of the ideas in it are good, some are bad. I probably wouldn't use it if I were you. Someday I might pay better attention to it.


Slaves:
-------

Slaves actually execute tests. In theory, a grid of slaves can be setup and they will continuously poll the master server for commands. In the initial version, testo will just be the slave, so there is no need for polling. Just an HTTP API for managing tests.

When a slave receives an execute command it should download the application and test, install the application on the specified device, and run the supplied test. The master should be responsible for coordinating tests, so before running another test on a slave it should check the slave's current state.

slave commands:

 - get '/sl/devices' - get the list of devices currently attached to the slave
 - post '/sl/execute' - begin running the supplied test on the supplied app
 - get '/sl/status' - get the current status of the slave
 - get '/sl/results' - get the results of the test execution
 - get '/sl/reset' - once a test is completed and the results have been fetched, reset the slave's state
 - get '/sl/abort' - abort the current test run

 - get/put '/sl/config' - get or update the slave's current configuration
