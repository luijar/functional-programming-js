/** 
 * Derived type Student from Person
 * Author: Luis Atencio
 */
const Person = require('./Person.js').Person;

class Student extends Person {
	constructor(firstname, lastname, ssn, school, birthYear = null, address = null) {
		super(firstname, lastname, ssn, birthYear, address);
		this._school = school;
	}

	get school() {
		return this._school;
	}
}
exports.Student = Student;