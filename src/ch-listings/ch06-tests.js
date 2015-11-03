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
//QUnit.module( "Chapter 6" );
//QUnit.test("RT example", function (assert) {
//
//    var increment = function (val) {
//        return val + 1;
//    };
//
//    var age = 20;
//    var template =  _.template('JavaScript turns ${years}; next it turns ${years + 1}; and then ${(years + 1) + 1}!');
//    var template2 =  _.template('JavaScript turns ${years}; next it turns ${increment(years)}; and then ${increment(increment(years))}!');
//
//    assert.equal(template({ 'years': age, 'increment':increment }), template2({ 'years': age, 'increment':increment }));
//});

//QUnit.test("JSCheck", function (assert) {
//
//    var trace = _.curry(logger)('console', 'json', 'JSCheck', 'TRACE');
//    var debug = _.curry(logger)('console', 'json', 'JSCheck', 'DEBUG');
//
//    JSC.clear();
//
//    var trim = function (str) {
//        return str.replace(/^\s*|\s*$/g, '');
//    };
//
//    var normalize = function (str) {
//        return str.replace(/\-/g, '');
//    };
//
//    var validLength = function(param, str) {
//        return str.length === param;
//    };
//
//    var checkLengthSsn = R.partial(validLength, 9);
//    var validateSsn = R.compose(checkLengthSsn, R.tap(debug), normalize, trim);
//
//    JSC.on_report(function (str) {
//        trace(str);
//    });
//
//    JSC.test(
//        "Validate SSN",
//        function (verdict, ssn) {
//            return verdict(validateSsn(ssn));
//        },
//        [
//            JSC.string(JSC.integer(9), JSC.one_of("123456789"))
//        ],
//        function (ssn) {
//            return 'Testing SSN:  ' + ssn;
//        }
//    );
//    assert.ok(true);
//});

QUnit.test("JSCheck 1", function (assert) {

    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time
        if (this.length != array.length)
            return false;

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    };

    var trace = _.curry(logger)('console', 'json', 'JSCheck', 'TRACE');

    JSC.clear();

    var toLetterGrade = function (grade) {
        if (grade >= 90) return 'A';
        if (grade >= 80) return 'B';
        if (grade >= 70) return 'C';
        if (grade >= 60) return 'D';
        return 'F';
    };

    var forkJoin = function(join, func1, func2){
        return function(val) {
            return join(func1(val), func2(val));
        };
    };


    JSC.on_report(function (str) {
        trace(str);
    });

    var computeAverageGrade = R.compose(toLetterGrade, forkJoin(R.divide, R.sum, R.length));

    JSC.test(
        "Compute Average Grade",
        function (verdict, grades, grade) {
            return verdict(computeAverageGrade(grades) === grade);
        },
        [
            JSC.array(JSC.integer(20), JSC.number(90, 100)),
            'A'
        ],
        function (grades, grade) {
            return 'Testing for an ' + grade + ' on grades: ' + grades;
        }
    );
    assert.ok(true);
});

//QUnit.test("JSCheck Custom Specifier for SSN", function (assert) {
//
//    var trace = _.curry(logger)('console', 'json', 'JSCheck', 'TRACE');
//    var debug = _.curry(logger)('console', 'json', 'JSCheck', 'DEBUG');
//
//    JSC.clear();
//
//    var trim = function (str) {
//        return str.replace(/^\s*|\s*$/g, '');
//    };
//
//    var normalize = function (str) {
//        return str.replace(/\-/g, '');
//    };
//
//    var validLength = function(param, str) {
//        return str.length === param;
//    };
//
//    var checkLengthSsn = R.partial(validLength, 9);
//    var validateSsn = R.compose(checkLengthSsn, normalize, trim);
//
//    JSC.on_report(function (str) {
//        trace('Report'+ str);
//    });
//
//
//    JSC.on_fail(function(object) {
//       assert.ok(object.args.length === 9, 'Test failed for: ' + object.args);
//    });
//
//    /**
//     * Produces a valid social security string (with dashes)
//     * @param param1 Valid input -> JSC.integer(100, 999)
//     * @param param2 Valid input -> JSC.integer(10, 99)
//     * @param param3 Valid input -> JSC.integer(1000,9999)
//     * @returns {Function} Specifier function
//     */
//    JSC.SSN = function (param1, param2, param3) {
//        return function generator() {
//            var part1 = typeof param1 === 'function'
//                ? param1(): param1;
//
//            var part2 = typeof param2 === 'function'
//                ? param2(): param2;
//
//            var part3 = typeof param3 === 'function'
//                ? param3(): param3;
//
//            return [part1 , part2, part3].join('-');
//        };
//    };
//
//    JSC.test(
//        "Validate SSN",
//        function (verdict, ssn) {
//            return verdict(validateSsn(ssn));
//        },
//        [
//            JSC.SSN(JSC.integer(100, 999), JSC.integer(10, 99), JSC.integer(1000,9999))  // make it fail by misconfiguring a parameter
//        ],
//        function (ssn) {
//            return 'Testing Custom SSN:  ' + ssn;
//        }
//    );
//    assert.ok(true);
//});
//
//var counter = 0;
//
//function incrementImp() {
//    return ++counter;
//}
//
//
//QUnit.test("Increment with zero", function (assert) {
//    assert.equal(incrementImp(), 1)
//});
//
//QUnit.test("Increment with negative", function (assert) {
//    counter = -10;
//    assert.equal(incrementImp(), -9)
//});
//
//QUnit.test("Increment with positive", function (assert) {
//    counter = 10;
//    assert.equal(incrementImp(), 11)
//});
//
//
//QUnit.test("Compute Average Grade", function (assert) {
//
//    var toLetterGrade = function (grade) {
//        if (grade >= 90) return 'A';
//        if (grade >= 80) return 'B';
//        if (grade >= 70) return 'C';
//        if (grade >= 60) return 'D';
//        return 'F';
//    };
//
//    assert.equal(toLetterGrade(90), 'A');
//    assert.equal(toLetterGrade(200), 'A');
//    assert.equal(toLetterGrade(80), 'B');
//    assert.equal(toLetterGrade(89), 'B');
//    assert.equal(toLetterGrade(70), 'C');
//    assert.equal(toLetterGrade(60), 'D');
//    assert.equal(toLetterGrade(59), 'F');
//    assert.equal(toLetterGrade(-10), 'F');
//});
//
//QUnit.test("R.Length", function (assert) {
//
//    assert.equal(R.length([0,1,2,3,4,5,6,7,8,9]), 10);
//    assert.equal(R.length([]), 0);
//});
//
//QUnit.test("R.divide", function (assert) {
//
//    assert.equal(R.divide(6, 3), 2);
//    assert.equal(R.divide(6, 0), Infinity);
//    assert.equal(R.divide(0, 3), 0);
//});
//
//QUnit.test("R.sum", function (assert) {
//
//    assert.equal(R.sum([0,1,2,3,4,5,6,7,8,9]), 45);
//    assert.equal(R.sum([0]), 0);
//    assert.equal(R.sum([-1, -2, -3]), -6);
//});
//
//
//QUnit.test("Functional Combinator: forkJoin", function (assert) {
//
//    var forkJoin = function(join, func1, func2){
//        return function(val) {
//            return join(func1(val), func2(val));
//        };
//    };
//
//    var timesTwo = forkJoin((x) => x + x, R.identity, R.identity);
//    assert.equal(timesTwo(1), 2);
//    assert.equal(timesTwo(2), 4);
//});
//
//
//
//QUnit.test("Compute Average Grade", function (assert) {
//
//    var toLetterGrade = function (grade) {
//        if (grade >= 90) return 'A';
//        if (grade >= 80) return 'B';
//        if (grade >= 70) return 'C';
//        if (grade >= 60) return 'D';
//        return 'F';
//    };
//
//    var forkJoin = function(join, func1, func2){
//        return function(val) {
//            return join(func1(val), func2(val));
//        };
//    };
//
//    var computeAverageGrade = R.compose(toLetterGrade, forkJoin(R.divide, R.sum, R.length));
//
//    assert.equal(computeAverageGrade([80, 90, 100]), 'A');
//    assert.equal(computeAverageGrade([80, 85, 89]), 'B');
//    assert.equal(computeAverageGrade([70, 75, 79]), 'C');
//    assert.equal(computeAverageGrade([60, 65, 69]), 'D');
//    assert.equal(computeAverageGrade([50, 55, 59]), 'F');
//    assert.equal(computeAverageGrade([-10]), 'F');
//});
