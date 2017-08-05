/**
  Chapter 6 code listings
  Author: Luis Atencio
*/

"use strict";

describe('Chapter 6', function () {

	const _ = require('lodash');
	const R = require('ramda');

	const Either = require('../../model/monad/Either.js').Either;

	const fork = (join, func1, func2) => (val) => join(func1(val), func2(val));

	test('Compute Average Grade', function () {

		const toLetterGrade = (grade) => {
			if (grade >= 90) return 'A';
			if (grade >= 80) return 'B';
			if (grade >= 70) return 'C';
			if (grade >= 60) return 'D';
			return 'F';
		};

		const computeAverageGrade =
			R.compose(toLetterGrade, fork(R.divide, R.sum, R.length));

		expect(computeAverageGrade([80, 90, 100])).toEqual('A');
	});

	test('Functional Combinator: fork', function () {
		const timesTwo = fork((x) => x + x, R.identity, R.identity);
		expect(timesTwo(1)).toEqual(2);
		expect(timesTwo(2)).toEqual(4);
	});

	test('showStudent: cleanInput', function () {

		const trim = (str) => str.replace(/^\s*|\s*$/g, '');
		const normalize = (str) => str.replace(/\-/g, '');
		const cleanInput = R.compose(normalize, trim);

		const input = ['', '-44-44-', '44444', ' 4 ', ' 4-4 '];
		const assertions = ['', '4444', '44444', '4', '44'];
		
		expect.assertions(input.length);
		
		input.forEach(function (val, key) {
			expect(cleanInput(val)).toEqual(assertions[key]);
		});
	});

	test('showStudent: checkLengthSsn', function () {

		// validLength :: Number, String -> Boolean
		const validLength = (len, str) => str.length === len;

		// checkLengthSsn :: String -> Either(String)
		const checkLengthSsn = ssn => {
			return Either.of(ssn)
				.filter(R.partial(validLength, [9]));
		};

		expect(checkLengthSsn('444444444').isRight).toBe(true);
		expect(checkLengthSsn('').isLeft).toBe(true);
		expect(checkLengthSsn('44444444').isLeft).toBe(true);
		expect(checkLengthSsn('444444444').chain(R.length)).toEqual(9);
	});

	test('showStudent: csv', function () {

		// csv :: Array => String
		const csv = arr => arr.join(',');

		expect(csv(['']), '');
		expect(csv(['Alonzo'])).toEqual('Alonzo');
		expect(csv(['Alonzo', 'Church'])).toEqual('Alonzo,Church');
		expect(csv(['Alonzo', '', 'Church'])).toEqual('Alonzo,,Church');
	});
});