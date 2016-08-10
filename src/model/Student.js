/** 
 * Derived type Student from Person
 * Author: Luis Atencio
 */
const Person = require('./Person.js').Person;

exports.Student = class Student extends Person {
	constructor(ssn, firstname, lastname, school, birthYear = null, address = null) {
		super(ssn, firstname, lastname, birthYear, address);
		this._school = school;
	}

	get school() {
		return this._school;
	}
};