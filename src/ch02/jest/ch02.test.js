/**
  Chapter 2 code listings
  Author: Luis Atencio
*/

"use strict";

describe('Chapter 2', function () {

	const R = require('ramda');
	
	const ValueObjects = require('../../model/value_objects.js');
	const zipCode = ValueObjects.zipCode;
	const coordinate = ValueObjects.coordinate;

	const Student = require('../../model/Student.js').Student;
	const Address = require('../../model/Address.js').Address;

	test("Playing with immutable value objects", function () {

		let princetonZip = zipCode('08544', '3345');
		expect(princetonZip.toString()).toEqual('08544-3345');

		let greenwich = coordinate(51.4778, 0.0015);
		expect(greenwich.toString()).toEqual('(51.4778,0.0015)');

		let newCoord = greenwich.translate(10, 10).toString();
		expect(newCoord.toString()).toEqual('(61.4778,10.0015)');
	});

	test("Deep freeze object", function () {
		const deepFreeze = require('../helper').deepFreeze;
		let address = new Address('US');
		let student = new Student('444-44-4444', 'Joe', 'Smith',
			'Harvard', 1960, address);
		let frozenStudent = deepFreeze(student);

		expect(() => {
			frozenStudent.firstname = 'Emmet'; // Expect: Cannot assign to read only property '_firstname' of object '#<Student>'	
		}).toThrow(TypeError);

		expect(() => {
			frozenStudent.address.country = 'Canada'; // Expect: Cannot assign to read only property '_country' of object '#<Address>'
		}).toThrow(TypeError);
	});


	test("Playing with Lenses", function () {
		let z = zipCode('08544', '1234');
		let address = new Address('US', 'NJ', 'Princeton', z, 'Alexander St.');
		let student = new Student('444-44-4444', 'Joe', 'Smith',
			'Princeton University', 1960, address);

		let zipPath = ['address', 'zip'];
		var zipLens = R.lensPath(zipPath);
		expect(R.view(zipLens, student)).toEqual(z);

		let beverlyHills = zipCode('90210', '5678');
		let newStudent = R.set(zipLens, beverlyHills, student);
		expect(R.view(zipLens, newStudent).code()).toEqual(beverlyHills.code());
		expect(R.view(zipLens, student)).toEqual(z);
		expect(newStudent).not.toEqual(student);
	});


	test("Negation", function () {
		function negate(func) {
			return function () {
				return !func.apply(null, arguments);
			};
		}

		function isNull(val) {
			return val === null;
		}

		let isNotNull = negate(isNull);
		expect(isNotNull(null)).toBe(false); //-> false
		expect(isNotNull({})).toBe(true)    //-> true
	});


	test("Immutable setters", function () {
		// thanks to feedback from ChernikovP	
		class Address {
			constructor(street) {
				this.street = street;
			}
		}

		class Person {
			constructor(name, address) {
				this.name = name;
				this.address = address;

			}
		}

		const person = new Person('John Doe', new Address('100 Main Street'));

		const streetLens = R.lens(R.path(['address', 'street']), R.assocPath(['address', 'street']));

		const newPerson = R.set(streetLens, '200 Broadway Street', person);

		expect(person instanceof Person).toBe(true); // true
		expect(newPerson instanceof Person).toBe(false); // false	
		expect(newPerson instanceof Object).toBe(true); // true
	});
});