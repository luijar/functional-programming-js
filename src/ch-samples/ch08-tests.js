/**
 * Functional Programming in JavaScript
 *
 * Unit tests for Chapter 08 code
 *
 * Apply FP
 *
 * Author: Luis Atencio
 */

"use strict";
QUnit.module( "Chapter 8");
const HOST = 'http://localhost:8000';

QUnit.test("Promises 1", function (assert) {

    var fetchStudents = Promise.resolve($.get(HOST + '/students'));

    fetchStudents.then(function(result) {
        console.log('Students found: ' + result.length);
    }, function (error) {
        alert('Error!');
    });
    assert.ok(true);
});
