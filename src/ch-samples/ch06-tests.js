/**
 * Functional Programming in JavaScript
 *
 * Unit tests for Chapter 06 code
 *
 * Unit testing functional code
 *
 * Author: Luis Atencio
 */

"use strict";

QUnit.test("CH06 - RT example", function (assert) {

    var increment = function (val) {
        return val + 1;
    };

    var age = 20;

    var template =  _.template('JavaScript turns ${years} this year; next it turns ${years + 1}; and then ${(years + 1) + 1}');
    //var template =  _.template('JavaScript turns ${years}; next year it turns ${increment(years)}; and then ${increment(increment(years))}!');
//    alert(template({ 'years': age, 'increment':increment }));

    //var expression = 'JavaScript turns '20 years today, next year it will turn 21';


    assert.ok(true);
});