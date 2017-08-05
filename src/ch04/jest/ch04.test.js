/**
  * Chapter 4 code listings
  * Author: Luis Atencio
  */
"use strict";

describe('Chapter 4', function () {
	const _ = require('lodash');
	const R = require('ramda');

	// Globally used functions throughout all code listings
	const isEmpty = s => !s || !s.trim();
	const isValid = val => !_.isUndefined(val) && !_.isNull(val);
	const trim = (str) => str.replace(/^\s*|\s*$/g, '');
	const normalize = (str) => str.replace(/\-/g, '');

	test("Chaining methods together", function () {

		let names = ['alonzo church', 'Haskell curry', 'stephen_kleene',
			'John Von Neumann', 'stephen_kleene'];

		let result = _.chain(names)
			.filter(isValid)
			.map(s => s.replace(/_/, ' '))
			.uniq()
			.map(_.startCase)
			.sort()
			.value();

		expect(result).toEqual(['Alonzo Church', 'Haskell Curry', 'John Von Neumann', 'Stephen Kleene']);
	});

	test("Check Type tests", function () {

		const checkType = require('../helper').checkType;
		expect(checkType(String)('Curry')).toEqual('Curry');
		expect(checkType(Number)(3)).toEqual(3);
		expect(checkType(Number)(3.5)).toEqual(3.5);
		let now = new Date();
		expect(checkType(Date)(now)).toEqual(now);
		expect(checkType(Object)({})).toEqual({});
		expect(() => {
			checkType(String)(42)
		}).toThrow(TypeError)
	});

	test("Tuple test", function () {

		const Tuple = require('../helper').Tuple;
		const StringPair = Tuple(String, String);
		const name = new StringPair('Barkley', 'Rosser');
		let [first, last] = name.values();  // In Node you need to use let
		expect(first).toEqual('Barkley');
		expect(last).toEqual('Rosser');
		expect(() => {
			const fullname = new StringPair('J', 'Barkley', 'Rosser');
		}).toThrow(TypeError);
	});

	test("Extending the core language", function () {

		// Take the first N characters
		String.prototype.first = _.partial(String.prototype.substring, 0, _);
		let result = 'Functional Programming'.first(3); // -> 'Fun'
		expect(result, 'Fun');

		// Convert any name into a Last, First format
		String.prototype.asName = _.partial(String.prototype.replace, /(\w+)\s(\w+)/, '$2, $1');
		result = 'Alonzo Church'.asName(); //-> 'Church, Alonzo'
		expect(result).toEqual('Church, Alonzo');

		String.prototype.explode = _.partial(String.prototype.match, /[\w]/gi);
		result = 'ABC'.explode(); //-> 
		expect(result).toEqual(['A', 'B', 'C']);

		// Parses a simple URL
		String.prototype.parseUrl = _.partial(String.prototype.match, /(http[s]?|ftp):\/\/([^:\/\s]+)\.([^:\/\s]{2,5})/);
		result = 'http://example.com'.parseUrl(); // -> ['http', 'example', 'com']
		expect(result).toEqual(expect.arrayContaining(['http://example.com', 'http', 'example', 'com']));
	});


	test("Composition", function () {
		const str = `We can only see a short distance ahead but we can see plenty there that needs to be done`;
		const explode = (str) => str.split(/\s+/);
		const count = (arr) => arr.length;
		const countWords = R.compose(count, explode);
		expect(countWords(str), 19); //-> 19	
	});


	test("More composition", function () {
		const trim = (str) => str.replace(/^\s*|\s*$/g, '');
		const normalize = (str) => str.replace(/\-/g, '');
		const validLength = (param, str) => str.length === param;
		const checkLengthSsn = _.partial(validLength, 9);

		const cleanInput = R.compose(normalize, trim);
		const isValidSsn = R.compose(checkLengthSsn, cleanInput);
		let result = cleanInput(' 444-44-4444 '); //-> '444444444'
		expect(result, '444444444');

		result = isValidSsn(' 444-44-4444 '); //-> true
		expect(result).toBe(true);
	});


	test("Composition with functional libraries", function () {
		// Given data: 
		let students = ['Rosser', 'Turing', 'Kleene', 'Church'];
		let grades = [80, 100, 90, 99];

		const smartestStudent = R.compose(
			R.head,
			R.pluck(0),
			R.reverse,
			R.sortBy(R.prop(1)),
			R.zip);

		let result = smartestStudent(students, grades); //-> 'Turing'
		expect(result, 'Turing');
	});

	test("Composition as point-free functions", function () {
		// Given data: 
		let students = ['Rosser', 'Turing', 'Kleene', 'Church'];
		let grades = [80, 100, 90, 99];

		const first = R.head;
		const getName = R.pluck(0);
		const reverse = R.reverse;
		const sortByGrade = R.sortBy(R.prop(1));
		const combine = R.zip;
		let result = R.compose(first, getName, reverse, sortByGrade, combine);
		expect(result(students, grades), 'Turing');
	});


	test("Show student program with currying and composition", function () {

		// Use the mock data from Chapter 1
		const db = require('../../ch01/helper').db;

		const find = R.curry((db, id) => db.find(id));

		// findObject :: DB -> String -> Object
		const findObject = R.curry(function (db, id) {
			const obj = find(db, id);
			if (obj === null) {
				throw new Error(`Object with ID [${id}] not found`);
			}
			return obj;
		});

		// findStudent :: String -> Student
		const findStudent = findObject(db);

		const csv = ({ ssn, firstname, lastname }) => `${ssn}, ${firstname}, ${lastname}`;

		// append :: String -> String -> String
		const append = R.curry(function (elementId, info) {
			console.log(info);
			return info;
		});

		// showStudent :: String -> Integer
		const showStudent = R.compose(
			append('#student-info'),
			csv,
			findStudent,
			normalize,
			trim);

		let result = showStudent('44444-4444'); //-> 444-44-4444, Alonzo, Church
		expect(result).toEqual('444-44-4444, Alonzo, Church')
	});


	test("More point-free coding", function () {
		const runProgram = R.pipe(
			R.map(R.toLower),
			R.uniq,
			R.sortBy(R.identity));

		let result = runProgram(['Functional', 'Programming', 'Curry', 'Memoization', 'Partial', 'Curry', 'Programming']);
		expect(result).toEqual(['curry', 'functional', 'memoization', 'partial', 'programming']);
		//-> [curry, functional, memoization, partial, programming]	
	});
});