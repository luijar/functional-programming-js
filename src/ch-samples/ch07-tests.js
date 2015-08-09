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


var start = function (name) {
    return function () {
        console.time(name);
    }
};

var end = function (name) {
    return function () {
        console.timeEnd(name);
    }
};


QUnit.test("Memoization with recursion", function (assert) {

    var fib = (function (x) {
        if(x < 2) return 1; else return fib(x-1) + fib(x-2);
    }).memoize();
    var runFib = IO.of(200).map(R.tap(start('fib'))).map(fib).map(R.tap(end('fib')));
    assert.equal(runFib.run(), 4.53973694165308e+41);  // 7.341ms
    assert.equal(runFib.run(), 4.53973694165308e+41);  // 0.016ms
});

QUnit.test("Memoization with md5", function (assert) {

    var m_md5 = md5.memoize();

    var runMd5 = IO.of('GetFunction@l!').map(R.tap(start('md5'))).map(m_md5).map(R.tap(end('md5')));
    assert.equal(runMd5.run(), '96b50e555c6d9ee4be6a07944695a814');  // 7.341ms
    assert.equal(runMd5.run(), '96b50e555c6d9ee4be6a07944695a814');  // 0.016ms
});


QUnit.test("Memoization Test (isPrime)", function (assert) {

    var isPrime = (function (num) {
        var prime = num !== 1;
        for (var i = 2; i < num; i++) {
            if (num % i == 0) {
                prime = false;
                break;
            }
        }
        return prime;
    }).memoize();

    assert.ok(isPrime(2), '2 is prime!');
    assert.ok(isPrime(3), '3 is prime!');
    assert.ok(isPrime(5), '5 is prime!');
    assert.ok(isPrime(17), '17 is prime!');
    assert.ok(!isPrime(6), '6 is not prime!');
});

