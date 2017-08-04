# Functional JavaScript Programming
##### By Luis Atencio

Since this code uses ES6 artifacts, any code meant to run on the browser must be transpiled with either:

* Babel
* Traceur

For Node.js users. This code requires:

node --version > 6.3.1

Please begin the project with

```bash
$ npm install
```

to load all of the required functional libraries.

In this repo you will find:

* All code samples (as runnable unit tests) of code used in chapters
* JS targeted for browser
* Functional data types like Optional, Either, Maybe, etc.
* Access to some JavaScript functional libraries like lodash.js, rxjs, etc.

## Running the tests

### [QUnit](https://api.qunitjs.com/)
Once QUnit is installed, you can run each test with the QUnit CLI by specifying the chapter number.

```bash
$ npm run ch[01-08]
```
### [Jest](https://facebook.github.io/jest/)
Additionally, you may also run unit tests using the [jest](https://facebook.github.io/jest/) test runner.

To run all tests:

```bash
$ npm test
```

And for code coverage:

```bash
$ npm run cover
```

To run a chapter test:

```bash
$ jest ch[01-08]
```