/**
 * Functional Programming in JavaScript
 *
 * Unit tests for Chapter 08 generators code
 *
 * Promises and Event Handling
 *
 * Author: Luis Atencio
 */
"use strict";
QUnit.module( "Chapter 8");

QUnit.test("Generator 1", function (assert) {

    function *addGenerator() {
        var i = 0;
        while (true) {
            i += yield i;
        }
    }
    var adder = addGenerator();
    assert.equal(adder.next().value, 0)
    assert.equal(adder.next(5).value, 5);
});