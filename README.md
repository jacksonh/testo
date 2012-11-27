testo
=====


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