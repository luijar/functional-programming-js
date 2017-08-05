/**
  Chapter 5 code listings
  Author: Luis Atencio
*/
"use strict";

describe('Chapter 5', function () {

	// Functional Libraries used in this chapter
	const _ = require('lodash');
	const R = require('ramda');

	// Monads/functors used
	const Wrapper = require('../../model/Wrapper.js').Wrapper;
	const wrap = require('../../model/Wrapper.js').wrap;
	const empty = require('../../model/Empty.js').empty;
	const Maybe = require('../../model/monad/Maybe.js').Maybe;
	const Either = require('../../model/monad/Either.js').Either;
	const IO = require('../../model/monad/IO.js').IO;

	// Models used
	const Student = require('../../model/Student.js').Student;
	const Address = require('../../model/Address.js').Address;
	const Person = require('../../model/Person.js').Person;

	test("Simple Wrapper test", function () {
		const wrappedValue = wrap('Get Functional');
		expect(wrappedValue.map(R.identity)).toEqual('Get Functional'); //-> 'Get Functional'
	});

	test("Simple functor test", function () {
		const plus = R.curry((a, b) => a + b);
		const plus3 = plus(3);
		const plus10 = plus(10);
		const two = wrap(2);
		const five = two.fmap(plus3); //-> Wrapper(5)
		expect(five.map(R.identity)).toEqual(5); //-> 5

		expect(two.fmap(plus3).fmap(plus10).map(R.identity)).toEqual(15); //-> Wrapper(15)
	});

	test("Simple find with wrapper", function () {
		// Use helper DB created in chapter 1	
		const db = require('../../ch01/helper').db;

		const find = R.curry((db, id) => db.find(id));

		const findStudent = R.curry((db, ssn) => {
			return wrap(find(db, ssn));
		});

		const getAddress = (student) => {
			return wrap(student.fmap(R.prop('firstname')));
		};

		const studentAddress = R.compose(
			getAddress,
			findStudent(db)
		);

		expect(studentAddress('444-44-4444')).toEqual(wrap(wrap('Alonzo')));
	});

	test("Simple empty container", function () {

		const isEven = (n) => Number.isFinite(n) && (n % 2 == 0);
		const half = (val) => isEven(val) ? wrap(val / 2) : empty();
		expect(half(4)).toEqual(wrap(2)); //-> Wrapper(2)
		expect(half(3)).toEqual(empty()); //-> Empty	
	});


	test("Simple empty container", function () {
		const WrapperMonad = require('../../model/monad/Wrapper.js').Wrapper;

		let result = WrapperMonad.of('Hello Monads!')
			.map(R.toUpper)
			.map(R.identity); //-> Wrapper('HELLO MONADS!')

		expect(result).toEqual(new WrapperMonad('HELLO MONADS!'));
	});

	test("Simple Maybe Test", function () {
		let result = Maybe.of('Hello Maybe!').map(R.toUpper);
		expect(result).toEqual(Maybe.of('HELLO MAYBE!'));

		const Nothing = require('../../model/monad/Maybe.js').Nothing;
		result = Maybe.fromNullable(null);
		expect(result).toEqual(new Nothing(null));
	});

	test("Maybe to extract a nested property in object graph", function () {

		let address = new Address('US');
		let student = new Student('444-44-4444', 'Joe', 'Smith',
			'Harvard', 1960, address);

		const getCountry = (student) => student
			.map(R.prop('address'))
			.map(R.prop('country'))
			.getOrElse('Country does not exist!');

		expect(getCountry(Maybe.fromNullable(student))).toEqual(address.country);
	});

	test("Maybe to extract a missing nested property in object graph", function () {

		let student = new Student('444-44-4444', 'Joe', 'Smith',
			'Harvard', 1960, null);

		const getCountry = (student) => student
			.map(R.prop('address'))
			.map(R.prop('country'))
			.getOrElse('Country does not exist!');

		expect(getCountry(Maybe.fromNullable(student))).toEqual('Country does not exist!');
	});


	test("Simple Either monad test", function () {

		// Use helper DB created in chapter 1	
		const db = require('../../ch01/helper').db;

		const find = R.curry((db, id) => db.find(id));

		const safeFindObject = R.curry(function (db, id) {
			const obj = find(db, id);
			if (obj) {
				return Either.of(obj);
			}
			return Either.left(`Object not found with ID: ${id}`);
		});

		const findStudent = safeFindObject(db);
		let result = findStudent('444-44-4444').getOrElse(new Student());
		expect(result).toEqual(new Person('444-44-4444', 'Alonzo', 'Church'));

		result = findStudent('xxx-xx-xxxx');
		expect(result).toEqual(Either.left(`Object not found with ID: xxx-xx-xxxx`));

		expect(() => {
			console.log(result.value);
		}).toThrow(TypeError);
	});

	// Common code used in the next unit tests

	// Use helper DB created in chapter 1	
	const db = require('../../ch01/helper').db;

	// validLength :: Number, String -> Boolean
	const validLength = (len, str) => str.length === len;

	const find = R.curry((db, id) => db.find(id));

	// safeFindObject :: Store, string -> Either(Object)
	const safeFindObject = R.curry((db, id) => {
		const val = find(db, id);
		return val ? Either.right(val) : Either.left(`Object not found with ID: ${id}`);
	});

	// checkLengthSsn :: String -> Either(String)
	const checkLengthSsn = ssn =>
		validLength(9, ssn) ? Either.right(ssn) : Either.left('invalid SSN');

	// finStudent :: String -> Either(Student)
	const findStudent = safeFindObject(db);

	// csv :: Array => String
	const csv = arr => arr.join(',');

	const trim = (str) => str.replace(/^\s*|\s*$/g, '');
	const normalize = (str) => str.replace(/\-/g, '');
	const cleanInput = R.compose(normalize, trim);

	test("Using Either in show Student", function () {

		const showStudent = (ssn) =>
			Maybe.fromNullable(ssn)
				.map(cleanInput)
				.chain(checkLengthSsn)
				.chain(findStudent)
				.map(R.props(['ssn', 'firstname', 'lastname']))
				.map(csv)
				.map(R.tap(console.log));  //-> Using R.tap to simulate the side effect (in the book we write to the DOM)

		let result = showStudent('444-44-4444').getOrElse('Student not found!')
		expect(result).toEqual('444-44-4444,Alonzo,Church');

		result = showStudent('xxx-xx-xxxx').getOrElse('Student not found!');
		expect(result).toEqual('Student not found!');
	});

	test("Monads as programmable commas", function () {

		// map :: (ObjectA -> ObjectB), Monad -> Monad[ObjectB]
		const map = R.curry((f, container) => container.map(f));
		// chain :: (ObjectA -> ObjectB), M -> ObjectB
		const chain = R.curry((f, container) => container.chain(f));

		const lift = R.curry((f, obj) => Maybe.fromNullable(f(obj)));

		const trace = R.curry((msg, obj) => console.log(msg));

		const showStudent = R.compose(
			R.tap(trace('Student printed to the console')),
			map(R.tap(console.log)),   //-> Using R.tap to simulate the side effect (in the book we write to the DOM)

			R.tap(trace('Student info converted to CSV')),
			map(csv),

			map(R.props(['ssn', 'firstname', 'lastname'])),

			R.tap(trace('Record fetched successfully!')),
			chain(findStudent),

			R.tap(trace('Input was valid')),
			chain(checkLengthSsn),
			lift(cleanInput)
		);

		let result = showStudent('444-44-4444').getOrElse('Student not found!');
		expect(result).toEqual('444-44-4444,Alonzo,Church');
	});


	test("Complete showStudent program", function () {

		// map :: (ObjectA -> ObjectB), Monad -> Monad[ObjectB]
		const map = R.curry((f, container) => container.map(f));
		// chain :: (ObjectA -> ObjectB), M -> ObjectB
		const chain = R.curry((f, container) => container.chain(f));

		const lift = R.curry((f, obj) => Maybe.fromNullable(f(obj)));

		const liftIO = function (val) {
			return IO.of(val);
		};

		// For unit testing purposes, this could be replaced with R.tap	
		const append = R.curry(function (elementId, info) {
			console.log('Simulating effect. Appending: ' + info)
			return info;
		});

		const getOrElse = R.curry((message, container) => container.getOrElse(message));

		const showStudent = R.compose(
			map(append('#student-info')),
			liftIO,
			getOrElse('unable to find student'),
			map(csv),
			map(R.props(['ssn', 'firstname', 'lastname'])),
			chain(findStudent),
			chain(checkLengthSsn),
			lift(cleanInput)
		);

		let result = showStudent('444-44-4444').run();
		expect(result).toEqual('444-44-4444,Alonzo,Church');


		let result2 = showStudent('xxx-xx-xxxx').run();
		expect(result2).toEqual('unable to find student');
	});
});