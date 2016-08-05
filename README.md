#Functional JavaScript Programming
##### By Luis Atencio

##Since this code uses ES6 artifacts, you must transpile your JavaScript code with either when running the code in a modern browser:

* Babel
* Traceur

For Node.js users. This code requires: 

node --version > 6.3.1

In this code repository you will find:

* All code samples (as runnable unit tests) of code used in chapters
* Sample application (Under Construction)
* Functional data types like Optional, Either, Maybe, etc
* Access to some JavaScript functional libraries like lodash.js, streams.js, bacon.js, etc.

##Libraries Requires
###QUnit
npm install qunit
###Ramda
npm install ramda
###Lodash
npm install lodash

##Running the tests
Once QUnit is installed. You can run each file with: 

$> node <path-to-qunit-cli.js> -t <chapter-num>/tests.js -c <chapter-num>/tests.js