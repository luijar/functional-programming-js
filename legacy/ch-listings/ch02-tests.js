/**
 * Unit tests for Chapter 02 code
 *
 * Author: Luis Atencio
 */

QUnit.module( "Chapter 2" );
"use strict";
QUnit.test("Freeze", function (assert) {

    var p = new Student('Luis', 'Atencio', 'Princeton');
    p.address = new Address('3111 World Dr', 'Orlando', 'FL', 'US');
    var frozenP = Object.freeze(p);
    frozenP.address.country = 'France'; // allowed

    assert.equal(p.getFullName(), 'Luis Atencio', 'Get full name');
    assert.equal(p.getSchool(), 'Princeton', 'Get School');
    assert.equal(frozenP.address.country, 'France');
});


QUnit.test("Value Objects", function (assert) {

    function Point(x, y) {
        var _x = x;
        var _y = y;

        return {
            getX: function () {
                return _x;
            },
            getY: function () {
                return _y;
            }
        };
    }

    var p = Point(2, 3);
    var p2 = Point(2, 3);
    var p3 = Point(4, 6);


    function equal(a, b) {
        return (a.getX() === b.getX()) && (a.getY() === b.getY());
    }

    function add(a, b) {
        return Point(a.getX() + b.getX(), a.getY() + b.getY());
    }

    assert.equal(p.getX(), 2, 'X is 2');
    assert.equal(p.getY(), 3, 'Y is 3');
    assert.ok(equal(p, p2), 'Two points are equal');
    assert.equal(add(p2, p3).getX(), 6);
    assert.equal(add(p2, p3).getY(), 9);
});


QUnit.test("First-class function", function (assert) {

    var multiplier = new Function('a', 'b', 'return a * b');

    assert.equal(multiplier(2, 3), 6);
});

QUnit.test("High-order function", function (assert) {

    var multiplier = new Function('a', 'b', 'return a * b');

    function applyOperator(a, b, opt) {
        return opt(a, b);
    }

    function add(a) {
        return function (b) {
            return a + b;
        }
    }

    assert.equal(multiplier(7, 3), 21);
    assert.equal(add(7)(3), 10);
});

QUnit.test("Call and Apply", function (assert) {

    function negate(func) {
        return function () {
            return !func.apply(null, arguments);
        };
    }

    function isNull(val) {
        return val === null;
    }

    var isNotNull = negate(isNull);

    assert.equal(isNotNull(null), false);
    assert.equal(isNotNull({}), true);
});


QUnit.test("Call and Apply 2", function (assert) {

    function defer(func, wait, args) {
        return setTimeout(function () {
            func.call(null, args);
        }, wait);
    }

    function say(something) {
        console.log(something);
        assert.ok(true);
    }

    defer(say, 1000, 'Hey!');
    assert.ok(true);
});

QUnit.test("Call and Apply 3", function (assert) {

    var person = new Person('Haskell', 'Curry');

    function defer(func, wait, args, thisArg) {
        return setTimeout(function () {
            func.call(thisArg, args);
        }, wait);
    }

    function extract(prop) {
        console.log(this[prop]);
        assert.ok(true);
    }

    defer(extract, 1000, 'firstname', person);
    assert.ok(true);
});

QUnit.test("Calling 'call' in strict-mode", function (assert) {

    function doWork() {

        if (this !== null) {
            assert.equal(this, window);
        }
        else {
            assert.equal(this, null);
        }
    }

    doWork.call(null);
});


QUnit.test("Function return", function (assert) {

    function doNothing() { }
    var result1 = doNothing();
    assert.ok(result1 === undefined);
});


QUnit.test("Closure example", function (assert) {

    var outerVar = 'Outer';

    function makeInner() {
        var innerVar = "Inner";

        function inner() {
            return 'I can see: ' + outerVar + ' and ' + innerVar;
        }

        return inner;
    }

    var inner = makeInner();
    var r = inner();

    assert.equal(r, 'I can see: Outer and Inner');
});


QUnit.test("Closure example 2 - free vars", function (assert) {

    var count = 0;

    function makeStudent(school) {

        function student(first, last) {
            var s = new Student(first, last, school);
            s.setMajor(major);
            s.setSsn(++count);
            return s;
        }
        var major = 'Mathematics';
        return student;
    }

    var princetonStudent = makeStudent('Princeton');
    var alonzoc = princetonStudent('Alonzo', 'Church');
    var stephenk = princetonStudent('Stephen', 'Kleene');
    assert.equal(alonzoc.getSsn(), 0);
});


QUnit.test("Closure practical - Hiding private vars", function (assert) {

    var makeCounter = function () {
        var _counter = 0;

        function changeBy(val) {
            _counter += val;
        }

        function setTo(val) {
            _counter = val;
        }

        return {
            increment: function () {
                changeBy(1);
                return this;
            },
            reset: function () {
                setTo(0);
                return this;
            },
            value: function () {
                return _counter;
            }
        }
    };

    var c1 = makeCounter();
    var c2 = makeCounter();

    assert.equal(c1.increment().increment().value(), 2);
    assert.equal(c2.increment().reset().value(), 0);
});


QUnit.test("Translate a point", function (assert) {

    function Point(x, y) {
        var _x = x;
        var _y = y;

        return {
            getX: function () {
                return _x;
            },
            getY: function () {
                return _y;
            },
            translate: function (x, y) {
                return Point(_x + x, _y + y);
            },
            toString: function () {
                return '(' + _x + ',' + _y + ')';
            }
        };
    }

    var p = Point(0, 0);
    var p2 = p.translate(2, 3);

    assert.ok('A point in space located at (2,3)' === 'A point in space located at ' + Point(2, 3));

    assert.equal(p.getX(), 0);
    assert.equal(p.getY(), 0);
    assert.equal(p2.getX(), 2);
    assert.equal(p2.getY(), 3);
});


QUnit.test("List of Persons", function (assert) {


    var p1 = new Person().setFirstname('Alonzo').setBirth(30).setLastname('Church');
    var p2 = new Person().setFirstname('Haskell').setBirth(80).setLastname('Curry');
    var p3 = new Person().setFirstname('Guy').setBirth(62).setLastname('Steele');

    var arr = [p3, p2, p1];

    arr.sort(function (p1, p2) {
        return p1.getBirth() - p2.getBirth();
    });

    assert.equal(arr[0].getFirstname(), 'Alonzo');
});

QUnit.test("Block Scope", function (assert) {

    function doWork() {
        if (!myVar) {
            var myVar = 10;
        }
        assert.equal(myVar, 10);
    }

    doWork();

    var student = 'Alonzo';

    function makeStudent() {
        student = 'Haskell';

        function student() {
        }
    }

    makeStudent();

    assert.equal(student, 'Alonzo');
});

QUnit.test("Block Scope Hoisting 2", function (assert) {

    var arr = [1, 2, 3, 4];

    function processArr() {

        function multipleBy10(val) {
            i = 10;
            return val * i;
        }

        for (var i = 0; i < arr.length; i++) {
            arr[i] = multipleBy10(arr[i]);
        }
    }

    processArr();
    assert.equal(arr[0], 10);
    assert.equal(arr[1], 2);
});


QUnit.test("Infamous loop issue", function (assert) {

    var p1 = new Person().setFirstname('Alonzo').setBirth(30).setLastname('Church');
    var p2 = new Person().setFirstname('Haskell').setBirth(80).setLastname('Curry');
    var p3 = new Person().setFirstname('Guy').setBirth(62).setLastname('Steele');

    var people = [p1, p2, p3];
    var ids = [];
    for (var i = 0; i < people.length; i++) {
        ids.push(function () {
            // compute ID based on i
            return 100 + i;
        });
    }
    for (var j in ids) {
        people[j].id = ids[j]();
    }
    assert.equal(people[0].id, 103);
    assert.equal(people[1].id, 103);
});


QUnit.test("Infamous loop issue solved", function (assert) {

    var p1 = new Person().setFirstname('Alonzo').setBirth(30).setLastname('Church');
    var p2 = new Person().setFirstname('Haskell').setBirth(80).setLastname('Curry');
    var p3 = new Person().setFirstname('Guy').setBirth(62).setLastname('Steele');

    var people = [p1, p2, p3];
    var ids = [];
    for (var i = 0; i < people.length; i++) {
        ids.push(function (index) {
            return function () {
                // compute ID based on i
                return 100 + index;
            };
        }(i));
    }
    for (var j in ids) {
        people[j].id = ids[j]();
    }
    assert.equal(people[0].id, 100);
    assert.equal(people[1].id, 101);
});


QUnit.test("Infamous loop issue solved 3", function (assert) {

    var p1 = new Person().setFirstname('Alonzo').setBirth(30).setLastname('Church');
    var p2 = new Person().setFirstname('Haskell').setBirth(80).setLastname('Curry');
    var p3 = new Person().setFirstname('Guy').setBirth(62).setLastname('Steele');

    var people = [p1, p2, p3];

    function idGenerator(index) {
        return 100 + index;
    }

    function assignIds(people, idGen, startIndex) {
        return people.map(function (person) {
            person.id = idGen(startIndex++);
        });
    }

    assignIds(people, idGenerator, 0);

    assert.equal(people[0].id, 100);
    assert.equal(people[1].id, 101);
});

QUnit.test("Infamous loop issue solved 4", function (assert) {

    var p1 = new Person().setFirstname('Alonzo').setBirth(30).setLastname('Church').setAddress('Florida', 'US');
    var p2 = new Person().setFirstname('Haskell').setBirth(80).setLastname('Curry').setAddress('Florida', 'US');
    var p3 = new Person().setFirstname('Guy').setBirth(62).setLastname('Steele').setAddress('Florida', 'US');

    var people = [p1, p2, p3];

    function printPeople(people, selector, printer) {
        for (var i = 0; i < people.length; i++) {
            if (selector((people[i]))) {
                printer(people[i]);
            }
        }
    }

    var selector = function (thisPerson) {
        return thisPerson.address.country === 'US';
    };

    var printer = function (thisPerson) {
        console.log(thisPerson);
    };

    printPeople(people, selector, printer);
    assert.ok(true);
});

QUnit.test("Problem with encapsulation", function (assert) {

    var person = new Person('Alan', 'Turing');
    person.firstname = 'No Encapsulation';
    assert.equal(person.firstname, 'No Encapsulation');
    delete person.firstname;
    assert.ok(_.isUndefined(person.firstname));
});


QUnit.test("Problem with encapsulation", function (assert) {

    var fruit = ['Cherries', 'apples', 'bananas'];
    fruit.sort();
    assert.equal(fruit[0], 'Cherries');

    var scores = [1, 10, 2, 21];
    scores.sort(); // [1, 10, 2, 21]
    assert.equal(scores[0], 1);
});


QUnit.test("Closures 2", function (assert) {

    function makeAddFunction(amount) {
        function add(number) {
            return number + amount;
        }
        return add;
    }

    function makeExponentialFunction(base) {
        function raiseTo(exponent) {
            return Math.pow(base, exponent);
        }

        return raiseTo;
    }

    var addTenTo = makeAddFunction(10);
    assert.equal(addTenTo(10), 20);

    var raiseThreeTo = makeExponentialFunction(3);
    assert.equal(raiseThreeTo(2), 9);
});