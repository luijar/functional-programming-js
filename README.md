#Functional JavaScript Programming
##### By Luis Atencio

##Update
*Code has been changed and fixed for Errata purposes, GitHub issues, and ES6 updates.*
*The old code now lives under the legacy.*

Since this code uses ES6 artifacts, any code meant to run on the browser must be transpiled with either:

* Babel
* Traceur

For Node.js users. This code requires: 

node --version > 6.3.1

Please begin the project with 

~~~
npm install
~~~

To load all of the required functional libraries.

In this repo you will find:

* All code samples (as runnable unit tests) of code used in chapters
* JS targeted for browser
* Functional data types like Optional, Either, Maybe, etc
* Access to some JavaScript functional libraries like lodash.js, streams.js, bacon.js, etc.

##Some of the libraries you will find in this book are  (you can run "npm install" to obtain these)

###QUnit
npm install qunit

###Ramda
npm install ramda

###Lodash
npm install lodash

###RxJS
npm install rxjs


##Running the tests
Once QUnit is installed. You can run each test file with: 

~~~
$> node <path-to-qunit-cli.js> -t <chapter-num>/tests.js -c <chapter-num>/tests.js
~~~

You can find "path-to-qunit-cli.js" in node_modules/qunit/bin/cli.js and "chapter-num" will be any of ch01...ch08