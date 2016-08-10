/**
  Chapter 5 code listings
  Author: Luis Atencio
*/
"use strict";

QUnit.module('Chapter 5');

const _ = require('lodash');
const R = require('ramda');
const Wrapper = require('../model/Wrapper.js').Wrapper;
const wrap = require('../model/Wrapper.js').wrap;
const empty = require('../model/Empty.js').empty;
const Maybe = require('../model/monad/Maybe.js').Maybe;

QUnit.test("Simple Wrapper test", function () {
	const wrappedValue = wrap('Get Functional');
	assert.equal(wrappedValue.map(R.identity), 'Get Functional'); //-> 'Get Functional'
});
 
QUnit.test("Simple functor test", function () {
	const plus = R.curry((a, b) => a + b);
	const plus3 = plus(3);
	const plus10 = plus(10);
	const two = wrap(2);
	const five = two.fmap(plus3); //-> Wrapper(5)
	assert.equal(five.map(R.identity), 5); //-> 5

	assert.equal(two.fmap(plus3).fmap(plus10).map(R.identity), 15); //-> Wrapper(15)
});

QUnit.test("Simple find with wrapper", function () {
	// Use helper DB created in chapter 1	
	const db = require('../ch01/helper').db;	

	const find = R.curry((db, id) => db.find(id));

	const findStudent = R.curry(function(db, ssn) {
		return wrap(find(db, ssn));
	});
	
	const getAddress = function(student) {
		return wrap(student.fmap(R.prop('firstname')));
	};

	const studentAddress = R.compose(
		getAddress,
		findStudent(db)
	);

	assert.deepEqual(studentAddress('444-44-4444'), wrap(wrap('Alonzo')));
});

QUnit.test("Simple empty container", function () {
	
	const isEven = (n) => Number.isFinite(n) && (n % 2 == 0);
	const half = (val) => isEven(val) ? wrap(val / 2) : empty();
	assert.deepEqual(half(4), wrap(2)); //-> Wrapper(2)
	assert.deepEqual(half(3), empty()); //-> Empty	
});


QUnit.test("Simple empty container", function () {
	const WrapperMonad = require('../model/monad/Wrapper.js').Wrapper;
	
	let result = WrapperMonad.of('Hello Monads!')
		.map(R.toUpper)
		.map(R.identity); //-> Wrapper('HELLO MONADS!')
 	
 	assert.deepEqual(result, new WrapperMonad('HELLO MONADS!'));
});

QUnit.test("Simple Maybe Test", function () {	
	let result = Maybe.of('Hello Maybe!').map(R.toUpper);
 	assert.deepEqual(result, Maybe.of('HELLO MAYBE!'));

	const Nothing = require('../model/monad/Maybe.js').Nothing;
 	result = Maybe.fromNullable(null);
 	assert.deepEqual(result, new Nothing(null));
});







