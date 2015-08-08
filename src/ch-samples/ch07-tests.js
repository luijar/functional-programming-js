/**
 * Functional Programming in JavaScript
 *
 * Unit tests for Chapter 07 code
 *
 * Optimizations
 *
 * Author: Luis Atencio
 */

"use strict";
QUnit.module( "Chapter 7" );
QUnit.test("Lazy and shortcut fusion", function (assert) {

    //var Z = R.range(1, 5);
    //alert(Z);
    //
    //Z = R.range(1, Infinity);
    //alert(Z);
    //
    //
    //var qp = {
    //    'A' : 4.0,
    //    'A-': 3.7,
    //    'B+': 3.3,
    //    'B' : 3.0,
    //    'B-': 2.7,
    //    'C+': 2.3,
    //    'C' : 2.0,
    //    'C-': 1.7,
    //    'F' : 0.0
    //};
    //
    //function computeAverageGrade(grades) {
    //    return grades.reduce(function (total, current) { return total + current; })
    //        / grades.length;
    //
    //}
    //
    //function totalQualtityPoints(credits, grade) {
    //    return credits * qp[grade];
    //}
    //
    //function GPA() {
    //
    //}

    var square = (x) => Math.pow(x, 2);
    var even = (x) => x % 2 === 0;

    var result = _.chain(_.range(200))
        .map(R.compose(R.tap(() => console.log('Mapping')), square))
        .filter(R.compose(R.tap(() => console.log('then filtering')), even))
        .take(3)
        .value();

    assert.ok(result.length === 3);


});
