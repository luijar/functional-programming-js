/**
  * Chapter 4 code listings
  * Author: Luis Atencio
  */
"use strict";

QUnit.module('Chapter 4');

const _ = require('lodash');
const R = require('ramda');

// Globally used functions throughout all code listings
const isEmpty = s => !s || !s.trim();
const isValid = val => !_.isUndefined(val) && !_.isNull(val);
const trim = (str) => str.replace(/^\s*|\s*$/g, '');
const normalize = (str) => str.replace(/\-/g, '');

QUnit.test("Chaining methods together", function () {

	let names = ['alonzo church', 'Haskell curry', 'stephen_kleene',
				 'John Von Neumann', 'stephen_kleene'];
    
    let result = _.chain(names)
		.filter(isValid)
		.map(s => s.replace(/_/, ' '))
		.uniq()
		.map(_.startCase)
		.sort()
		.value();		

	assert.deepEqual(result, [ 'Alonzo Church', 'Haskell Curry', 'John Von Neumann', 'Stephen Kleene' ]);	
});

QUnit.test("Check Type tests", function () {

	const checkType = require('./helper').checkType;	
	assert.equal(checkType(String)('Curry'), 'Curry');
	assert.equal(checkType(Number)(3), 3);
	let now = new Date();
	assert.equal(checkType(Date)(now), now);
	assert.deepEqual(checkType(Object)({}), {});	
	assert.throws(() => {
		checkType(String)(42)
	}, TypeError);
});

QUnit.test("Tuple test", function () {

	const Tuple = require('./helper').Tuple;	
	const StringPair = Tuple(String, String);
	const name = new StringPair('Barkley', 'Rosser');
	let [first, last] = name.values();  // In Node you need to use let
	assert.equal(first, 'Barkley');
	assert.equal(last, 'Rosser');
	assert.throws(() => {
		const fullname = new StringPair('J', 'Barkley', 'Rosser');	
	}, TypeError);	
});
