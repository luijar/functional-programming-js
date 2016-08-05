/**
  Chapter 1 code listings
  Author: Luis Atencio
*/

"use strict";

const R = require('ramda');

QUnit.module('Chapter 1');

// Use "run" as an alias in chapter 1. This is shown to just
// warm up to the concept of composition
const run = R.compose;

QUnit.test("Listing 1.1 Functional printMessage", function () {
    // The book uses the DOM to print. I'll use the console instead in Node. 
    // But it's the same mechanism

    const printToConsole = str => {
    	console.log(str);
    	return str;
    };
    const toUpperCase = str => str.toUpperCase();
    const echo = R.identity; 

    const printMessage = run(printToConsole, toUpperCase, echo);	
    assert.equal(printMessage('Hello World'), 'HELLO WORLD');
});
 
QUnit.test("Listing 1.2 Extending printMessage", function () {
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
	    	for(let i = 0; i < times; i++) {
	    		tokens.push(str);
	    	}
    		return tokens.join(' ');	
    	};    	
    };

    const printMessage = run(printToConsole, repeat(3), toUpperCase, echo);	
    assert.equal(printMessage('Hello World'), 'HELLO WORLD HELLO WORLD HELLO WORLD');
});

QUnit.test("Listing 1.3 Imperative showStudent function with side effects", function () {
    // The book uses a mock storage object in chapter 1.
    const db = require('./helper').db;
    
    function showStudent(ssn) {
    	let student = db.find(ssn);    	
    	if(student !== null) {
    		let studentInfo = `<p>${student.ssn},${student.firstname},${student.lastname}</p>`;
			console.log(studentInfo);
    		return studentInfo;
    	}
    	else {
    		throw new Error('Student not');
    	}
    }
    
    assert.equal(showStudent('444-44-4444'), '<p>444-44-4444,Alonzo,Church</p>');
});



 
