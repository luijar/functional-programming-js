/**
  Chapter 2 code listings
  Author: Luis Atencio
*/

"use strict";

QUnit.module('Chapter 2');

const ValueObjects = require('../model/value_objects.js');

QUnit.test("Playing with immutable value objects", function () {
	let zipCode = ValueObjects.zipCode;
	const princetonZip = zipCode('08544', '3345');
	assert.equal(princetonZip.toString(), '08544-3345');

	let coordinate = ValueObjects.coordinate;
	const greenwich = coordinate(51.4778, 0.0015);
	assert.equal(greenwich.toString(), '(51.4778,0.0015)');

	let newCoord = greenwich.translate(10, 10).toString();
	assert.equal(newCoord.toString(), '(61.4778,10.0015)');
});
 

