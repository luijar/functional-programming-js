/**
  Chapter 8 code listings
  This JS file contains tests covering all of the sections of this chapter.
  Author: Luis Atencio
*/

"use strict";

describe('Chapter 8', function () {
	const Student = require('../../model/Student.js').Student;
	const Address = require('../../model/Address.js').Address;
	const Person = require('../../model/Person.js').Person;

	const IO = require('../../model/monad/IO.js').IO;

	const R = require('ramda');
	const Rx = require('rxjs/Rx');

	// Helper mock function to simulate an AJAX call
	const getJSON = function (fakeUrl) {
		console.log('Fetching data from URL: ' + fakeUrl);
		return new Promise(function (resolve, reject) {

			// Mock student data	
			if (fakeUrl.indexOf('students') >= 0) {
				var s1 = new Student('111-11-1111', 'Haskell', 'Curry', 'Princeton', 1900, new Address('US'));
				var s2 = new Student('222-22-2222', 'Barkley', 'Rosser', 'Princeton', 1907, new Address('Greece'));
				var s3 = new Student('333-33-3333', 'John', 'von Neumann', 'Princeton', 1903, new Address('Hungary'));
				var s4 = new Student('444-44-4444', 'Alonzo', 'Church', 'Princeton', 1903, new Address('US'));

				resolve([s2, s3, s4, s1]);
			}
			// Mock grades for each student
			else {
				resolve([80, 70, 20, 40, 99, 100]);
			}
		});
	};

	test("Generator 1", function () {

		function* addGenerator() {
			var i = 0;
			while (true) {
				i += yield i;
			}
		}
		let adder = addGenerator();
		expect(adder.next().value).toEqual(0);
		expect(adder.next(5).value).toEqual(5);
	});

	test("Generator 2", function () {

		function* range(start, finish) {
			for (let i = start; i < finish; i++) {
				yield i;
			}
		}

		let r = range(0, Number.POSITIVE_INFINITY);
		expect(r.next().value).toEqual(0);
		expect(r.next().value).toEqual(1);
		expect(r.next().value).toEqual(2);
	});

	test("Generator 3", function () {
		function range(start, end) {
			return {
				[Symbol.iterator]() {
					return this;
				},

				next() {
					if (start < end) {
						return { value: start++, done: false };
					}
					return { done: true, value: end };
				}
			};
		}

		let res = [];
		for (let num of range(0, 5)) {
			console.log(num);
			res.push(num);
		}
		expect(res).toEqual([0, 1, 2, 3, 4]);
	});

	test("Fetching student data with async calls", function () {

		const fork = (join, func1, func2) => (val) => join(func1(val), func2(val));

		const csv = arr => arr.join(',');

		getJSON('/students')
			.then(R.tap(() => console.log('Hiding spinner')))  // <- simulate a spinner being hidden on the site
			.then(R.filter(s => s.address.country === 'US'))
			.then(R.sortBy(R.prop('_ssn')))
			.then(R.map(student => {
				return getJSON('/grades?ssn=' + student.ssn)
					.then(R.compose(Math.ceil, fork(R.divide, R.sum, R.length)))
					.then(grade =>
						IO.of(R.merge({ '_grade': grade }, student))
							//.map(console.log)				
							.map(R.props(['_ssn', '_firstname', '_lastname', '_grade']))
							.map(csv)
							.map(console.log).run())  // <- Print results to the console								
			}))
			.catch(function (error) {
				console.log('Error occurred: ' + error.message);
			});
		expect.assertions(0); // when run this code prints to the screen all of the output through the IO monad, so nothing to expect
	});

	test("Rx test", function () {

		let res = [];
		Rx.Observable.range(1, 3)
			.subscribe(
			x => {
				console.log(`Next: ${x}`)
				res.push(x);
			},
			err => console.log(`Error: ${err}`),
			() => console.log('Completed')
			);
		expect(res).toEqual([1, 2, 3]);
	});



	test("Rx test 2", function () {

		let res = [];
		Rx.Observable.of(1, 2, 3, 4, 5)
			.filter(x => x % 2 !== 0)
			.map(x => x * x)
			.subscribe(x => {
				console.log(`Next: ${x}`)
				res.push(x);
			}
			);
		expect(res).toEqual([1, 9, 25]);
	});
});