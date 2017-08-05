/**
  Chapter 1 code listings
  Author: Luis Atencio
*/

"use strict";

const R = require('ramda');
const _ = require('lodash');

// Print versions
console.log('Using Lodash: ' + _.VERSION);

describe('Chapter 1', function () {

	// Use "run" as an alias in chapter 1. This is shown to just
	// warm up to the concept of composition
	const run = R.compose;

	test("Listing 1.1 Functional printMessage", function () {
		// The book uses the DOM to print. I'll use the console instead in Node. 
		// But it's the same mechanism

		const printToConsole = str => {
			console.log(str);
			return str;
		};
		const toUpperCase = str => str.toUpperCase();
		const echo = R.identity;

		const printMessage = run(printToConsole, toUpperCase, echo);
		expect(printMessage('Hello World')).toEqual('HELLO WORLD');
	});

	test("Listing 1.2 Extending printMessage", function () {
		// The book uses the DOM to print. I'll use the console instead in Node. 
		// But it's the same mechanism

		const printToConsole = str => {
			console.log(str);
			return str;
		};
		const toUpperCase = str => str.toUpperCase();
		const echo = R.identity;

		const repeat = (times) => {
			return function (str = '') {
				let tokens = [];
				for (let i = 0; i < times; i++) {
					tokens.push(str);
				}
				return tokens.join(' ');
			};
		};

		const printMessage = run(printToConsole, repeat(3), toUpperCase, echo);
		//assert.equal(printMessage('Hello World'), 'HELLO WORLD HELLO WORLD HELLO WORLD');
		expect(printMessage('Hello World')).toEqual('HELLO WORLD HELLO WORLD HELLO WORLD');
	});

	test("Listing 1.3 Imperative showStudent function with side effects", function () {
		// The book uses a mock storage object in chapter 1.
		const db = require('../helper').db;

		function showStudent(ssn) {
			let student = db.find(ssn);
			if (student !== null) {
				let studentInfo = `<p>${student.ssn},${student.firstname},${student.lastname}</p>`;
				console.log(studentInfo);
				return studentInfo;
			}
			else {
				throw new Error('Student not');
			}
		}

		expect(showStudent('444-44-4444')).toEqual('<p>444-44-4444,Alonzo,Church</p>');
	});

	// Using alias for curry
	const curry = R.curry;

	test("Listing 1.4 Decomposing the showStudent program", function () {
		// The book uses a mock storage object in chapter 1.
		// Instead of appending to the DOM, I write to the console

		const db = require('../helper').db;

		const find = curry((db, id) => {
			let obj = db.find(id);
			if (obj === null) {
				throw new Error('Object not found!');
			}
			return obj;
		});

		const csv = student => `${student.ssn}, ${student.firstname}, ${student.lastname}`;

		const append = curry((source, info) => {
			source(info);
			return info;
		});

		const showStudent = run(
			append(console.log),
			csv,
			find(db)
		);

		expect(showStudent('444-44-4444')).toEqual('444-44-4444, Alonzo, Church');
	});

	test("Listing 1.5 Programming with function chains", function () {
		// array with 3 student enrollment data
		const enrollments = [
			{
				enrolled: 3,  // student enrolled in 3 courses, with avg grade of 90
				grade: 90
			},
			{
				enrolled: 1,  // student enrolled in 1 course, with avg grade of 100
				grade: 100
			},
			{
				enrolled: 1,  // student enrolled in 1 course, with avg grade of 87
				grade: 87
			},
		];

		const result =
			_.chain(enrollments)
				.filter(student => student.enrolled > 1)
				.map(_.property('grade'))
				.mean()
				.value();

		console.log(result);

		expect(result).toEqual(90);
	});
});