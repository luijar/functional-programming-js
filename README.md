# Functional JavaScript Programming
##### By Luis Atencio

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
* Access to some JavaScript functional libraries like lodash.js, rxjs, etc.

### QUnit
npm install qunit

### Ramda
npm install ramda

### Lodash
npm install lodash

### RxJS
npm install rxjs


## Running the tests
Once QUnit is installed. You can run each test with the QUnit CLI by specifying the chapter number.
~~~
$> npm run ch[1-8]
~~~
