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

