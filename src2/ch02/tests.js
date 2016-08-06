/**
  Chapter 2 code listings
  Author: Luis Atencio
*/

"use strict";

QUnit.module('Chapter 2');

const R = require('ramda');

const ValueObjects = require('../model/value_objects.js');
const zipCode = ValueObjects.zipCode;
const coordinate = ValueObjects.coordinate;

const Student = require('../model/Student.js').Student;
const Address = require('../model/Address.js').Address;

QUnit.test("Playing with immutable value objects", function () {
	
	let princetonZip = zipCode('08544', '3345');
	assert.equal(princetonZip.toString(), '08544-3345');

	let greenwich = coordinate(51.4778, 0.0015);
	assert.equal(greenwich.toString(), '(51.4778,0.0015)');

	let newCoord = greenwich.translate(10, 10).toString();
	assert.equal(newCoord.toString(), '(61.4778,10.0015)');
});

QUnit.test("Deep freeze object", function () {
	const deepFreeze = require('./helper').deepFreeze;	
	let address = new Address('US');
	let student = new Student('444-44-4444', 'Joe', 'Smith', 
		'Harvard', 1960, address);
	let frozenStudent = deepFreeze(student);

	assert.throws(() => {
		frozenStudent.firstname = 'Emmet'; // Expect: Cannot assign to read only property '_firstname' of object '#<Student>'	
	}, TypeError);

	assert.throws(() => {
		frozenStudent.address.country = 'Canada'; // Expect: Cannot assign to read only property '_country' of object '#<Address>'
	}, TypeError);	
});
 

QUnit.test("Playing with Lenses", function () {
	let z = zipCode('08544','1234');
	let address = new Address('US', 'NJ', 'Princeton', z, 'Alexander St.');
	let student = new Student('444-44-4444', 'Joe', 'Smith', 
		'Princeton University', 1960, address);	
	
	let zipPath = ['address', 'zip'];
	var zipLens = R.lens(R.path(zipPath), R.assocPath(zipPath));
	assert.deepEqual(R.view(zipLens, student), z);

	let beverlyHills = zipCode('90210', '5678');
	let newStudent = R.set(zipLens, student, beverlyHills);
	assert.deepEqual(R.view(zipLens, newStudent), beverlyHills); // TODO
	assert.deepEqual(R.view(zipLens, student), z); // TODO
	assert.ok(newStudent !== student);
});
 

 







