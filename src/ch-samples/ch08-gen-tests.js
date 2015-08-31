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

QUnit.test("Generator 2", function (assert) {

    function *range(start, finish) {
        for(let i = start; i < finish; i++) {
            yield i;
        }
    }

    var r = range(0, Number.POSITIVE_INFINITY);
    assert.equal(r.next().value, 0)
    assert.equal(r.next().value, 1);
    assert.equal(r.next().value, 2);


});