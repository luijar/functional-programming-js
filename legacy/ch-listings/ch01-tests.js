/**
 * Sample code for CH01
 *
 * Author: Luis Atencio
 * Book: Functional Programming in JavaScript
 */
QUnit.module( "Chapter 1" );
"use strict";

QUnit.test(" Rectangle", function (assert) {

    var rectangle = new Rectangle(10, 20);

    assert.equal(rectangle.getWidth(), 10, 'Get Width');
    assert.equal(rectangle.getHeight(), 20, 'Get Height');
    assert.equal(perimeter(10, 20), 60, 'Get Perimeter');
    assert.equal(area(10, 20), 200, 'Get Area');
});

QUnit.test(" Test Array Reduce", function (assert) {


    var result1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(function (previousValue, currentValue, index, array) {
        return previousValue + currentValue;
    });

    var result2 = 0;
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < array.length; i++) {
        result2 += array[i];
    }

    assert.equal(result1, result2, 'Imperative vs Declarative = ' + result1);
});


QUnit.test(" Factorials", function (assert) {

    // Recursive approach
    function fact(n) {
        return n < 2 ? n : n * fact(n - 1);
    }

    // Looping
    function fact2(n) {
        if (n < 2) {
            return n;
        }
        var res = 1;
        for (var i = n; i > 1; i--) {
            res *= i;
        }
        return res;
    }

    for (var i = 0; i < 10; i++) {
        assert.equal(fact(i), fact2(i), i + ' factorial is ' + fact(i));
    }
});

QUnit.test(" Simple examples 01", function (assert) {

    var echo = function (msg) {
        return function () {
            return msg;
        };
    };
    var shoutIt = function (str) {
        return str + '!';
    };

    var shoutHelloWorld = _.compose(shoutIt, echo('Hello World'));
    assert.equal(shoutHelloWorld(), 'Hello World!', 'Shout Hello World!');
});

QUnit.test(" Function with side effects", function (assert) {

    var students = [];

    function insertUserDbRecord(studentId, className) {
        if (students === null) {
            students = [];
        }
        students.push(studentId, {studentId: className});
        console.log('Student has been added to class: ' + className);
        return true;
    }

    function isEnrolled(studentId) {
        for (var studentObj in students) {
            if (studentObj.studentId === studentId) {
                return true;
            }
        }
        return false;
    }

    // This function has side effects
    function enrollInCourse(studentId, className) {

        if (isEnrolled(studentId)) {
            console.log('Student is already enrolled in : ' + className);
            return true;
        }
        return insertUserDbRecord(studentId, className);
    }

    var enrolled = enrollInCourse(123, 'FP101 - Introduction to Functional Programming');

    assert.ok(enrolled, 'User is Enrolled!');
});


QUnit.test(" Function order of execution matters", function (assert) {

    var isInit = false;

    function init() {
        // initialize program
        isInit = true;
    }

    function fetchData() {
        if (!isInit) {
            throw 'DataNotInitializedError';
        }
        // fetch data
    }

    assert.ok(true);
});

QUnit.test(" Mutable swap function", function (assert) {

    var test = [1, 2, 3];

    function swap(items, firstIndex, secondIndex) {
        var temp = items[firstIndex];
        items[firstIndex] = items[secondIndex];
        items[secondIndex] = temp;
    }

    swap(test, 0, 1);
    assert.equal(test[0], 2);
    assert.equal(test[1], 1);
});

QUnit.test(" Immutable swap function", function (assert) {

    // Array.from polyfill
    if (!Array.from) {
        Array.from = (function () {
            var toStr = Object.prototype.toString;
            var isCallable = function (fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function (value) {
                var number = Number(value);
                if (isNaN(number)) {
                    return 0;
                }
                if (number === 0 || !isFinite(number)) {
                    return number;
                }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function (value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            // The length property of the from method is 1.
            return function from(arrayLike/*, mapFn, thisArg */) {
                // 1. Let C be the this value.
                var C = this;

                // 2. Let items be ToObject(arrayLike).
                var items = Object(arrayLike);

                // 3. ReturnIfAbrupt(items).
                if (arrayLike == null) {
                    throw new TypeError("Array.from requires an array-like object - not null or undefined");
                }

                // 4. If mapfn is undefined, then let mapping be false.
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    // 5. else
                    // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }

                    // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }

                // 10. Let lenValue be Get(items, "length").
                // 11. Let len be ToLength(lenValue).
                var len = toLength(items.length);

                // 13. If IsConstructor(C) is true, then
                // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
                // 14. a. Else, Let A be ArrayCreate(len).
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);

                // 16. Let k be 0.
                var k = 0;
                // 17. Repeat, while k < len… (also steps a - h)
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                        A[k] = kValue;
                    }
                    k += 1;
                }
                // 18. Let putStatus be Put(A, "length", len, true).
                A.length = len;
                // 20. Return A.
                return A;
            };
        }());
    }

    var test = [1, 2, 3];

    function swap(items, firstIndex, secondIndex) {

        var copy = Array.from(items);
        var temp = copy[firstIndex];
        copy[firstIndex] = copy[secondIndex];
        copy[secondIndex] = temp;
        return copy;
    }

    var swapTest = swap(test, 0, 1);
    assert.equal(test[0], 1);
    assert.equal(test[1], 2);
    assert.equal(swapTest[0], 2);
    assert.equal(swapTest[1], 1);
});

QUnit.test(" Compose swap, split, and join", function (assert) {

    function swap(items, firstIndex, secondIndex) {
        var copy = Array.from(items);
        var temp = copy[firstIndex];
        copy[firstIndex] = copy[secondIndex];
        copy[secondIndex] = temp;
        return copy;
    }

    function splitOnSpace(str) {
        return str.split(/\s+/);
    }

    function joinWithSpace(arr) {
        return arr.join(' ');
    }

    var swap01 = _.partial(swap, _, 0, 1);
    var reverseName = _.compose(joinWithSpace, swap01, splitOnSpace);

    assert.equal(reverseName('Luis Atencio'), 'Atencio Luis');

    var number = _.compose(Math.round, parseFloat);

    assert.equal(number('2.5'), 3);

    function add(a, b) {
        return a + b;
    }

    var result = add(number(2.5), number(3.5));
    assert.equal(result, 7);

});


QUnit.test(" Function composition", function (assert) {

    function stripNonAlpha(str) {
        return str.replace(/[^a-z]*/ig, '');
    }

    var stripEncode = _.compose(btoa, stripNonAlpha);

    assert.equal(stripEncode('#$#$^&ABC&*&*&'), 'QUJD', true);
});


QUnit.test(" Function composition", function (assert) {

    function stripNonAlpha(str) {
        return str.replace(/[^a-z]*/ig, '');
    }

    var stripEncode = _.compose(btoa, stripNonAlpha);

    assert.equal(stripEncode('#$#$^&ABC&*&*&'), 'QUJD', true);
});

QUnit.test(" RT Volume and Area", function (assert) {

    function areaSquare(a) {
        return a * a;
    }

    function volumeCube(areaSquare, a) {
        return areaSquare * a;
    }

    assert.equal(volumeCube(4, 2), 2 * areaSquare(2), 'Volume and area are RT');
});


QUnit.test(" Filtering", function (assert) {

    var result = [[], null, undefined, {}, 'String', 1, false].filter(_.isObject);

    assert.equal(result.length, 2, 'Filtered out objects');
});

QUnit.test(" Take and Repeat", function (assert) {


    var naturalNumbers = Stream.range(); // naturalNumbers is now 1, 2, 3, ...

    var evenNumbers = naturalNumbers.map(function (x) {
        return 2 * x;
    });
    // evenNumbers is now 2, 4, 6, ...

    var oddNumbers = naturalNumbers.filter(function (x) {
        return x % 2 != 0;
    }); // oddNumbers is now 1, 3, 5, ...

    evenNumbers.take(3).print(); // prints 2, 4, 6
    oddNumbers.take(3).print(); // prints 1, 3, 5

    assert.ok(true);
});

QUnit.test(" Data processing", function (assert) {

    var luis = new Person().setFirstname('Luis').setAddress('Ft. Lauderdale', 'US');

    luis.addFriend(new Person()
        .setFirstname('Carlos')
        .setAddress('Ft. Lauderdale', 'US'));

    luis.addFriend(new Person()
        .setFirstname('Carlos')
        .setAddress('Weston', 'US'));

    luis.addFriend(new Person()
        .setFirstname('Ana')
        .setAddress('Ft. Lauderdale', 'US'));

    var friendsInUs = luis.getFriendsBy(function (f) {
        return f.getAddress().getCountry() === 'US';
    });

    assert.equal(friendsInUs.length, 3);

    var friendsInFtLauder = luis.getFriendsBy(function (f) {
        return f.getAddress().getCity() === 'Ft. Lauderdale';
    });

    assert.equal(friendsInFtLauder.length, 2);

    var friendsInLuisCity = luis.getFriendsBy(function (f) {
        return f.getAddress().getCity() === this.getAddress().getCity();
    });

    assert.equal(friendsInLuisCity.length, 2);
});


QUnit.test(" Data processing - non functional", function (assert) {

    function Person2(name, country) {
        this.name = name;
        this.country = country;
        this.friends = [];
    }

    Person2.prototype.addFriend = function (f) {
        this.friends.push(f);
    };
    Person2.prototype.getCountry = function () {
        return this.country;
    };
    Person2.prototype.getFriendsInUs = function () {
        var usFriends = [];
        for (var idx in this.friends) {
            var friend = this.friends[idx];
            if (friend.country === 'US') {
                usFriends.push(friend);
            }
        }
        return usFriends;
    };
    Person2.prototype.getFriendsNotInUs = function () {
        var nonUsFriends = [];
        for (var idx in this.friends) {
            var friend = this.friends[idx];
            if (friend.country !== 'US') {
                nonUsFriends.push(friend);
            }
        }
        return nonUsFriends;
    };

    var luis = new Person2('Luis', 'US');
    luis.addFriend(new Person2('Carlos', 'US'));
    luis.addFriend(new Person2('Ana', 'US'));
    luis.addFriend(new Person2('Nicole', 'Venezuela'));

    var friendsInUs = luis.getFriendsInUs();
    var friendsNotInUs = luis.getFriendsNotInUs();

    assert.equal(friendsInUs.length, 2);
    assert.equal(friendsNotInUs.length, 1);
});

QUnit.test(" Recursion vs Looping", function (assert) {

    var foo = _.rest(['a']);
    assert.equal(foo.length, 0);

    var arr = ['Arizona', 'Mississippi', 'Florida', 'California', 'Ohio'];

    function longest(arr) {

        var longest = '';
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].length > longest.length) {
                longest = arr[i];
            }
        }
        return longest;
    }

    assert.equal(longest(arr), 'Mississippi');


    var longest2 = (function longest2(str, arr) {

        return _.isEmpty(arr) ? str :
            longest2(_.first(arr).length >= str.length ? _.first(arr) : str,
                _.rest(arr));
    }).bind(null, '');

    assert.equal(longest2(arr), 'Mississippi');
});





QUnit.test(" Students enrolled in more than 1 class", function (assert) {

    var roster = [{name: 'Alonzo', enrolled: 3, grade: 99},
        {name: 'Rosser', enrolled: 1, grade: 80},
        {name: 'Turing', enrolled: 2, grade: 89}];

    var totalGrades = 0;
    var totalStudentsFound = 0;
    for (var i = 0; i < roster.length; i++) {
        var student = roster[i];
        if (student !== null) {
            if (student.enrolled > 1) {
                totalGrades += student.grade;
                totalStudentsFound++;
            }
        }
    }
    var average = Math.floor(totalGrades / totalStudentsFound);
    assert.equal(average, 94);


    function getStudents(roster) {
        return roster.filter(function (student) {
            return student.enrolled > 1
        })
            .map(function (student) {
            return student.grade;
        });
    }

    function calcAverage(grades) {
        return grades.reduce(function (total, current) {
                return total + current
            }) / grades.length;
    }

    _.mixin({
        'average': calcAverage
    });

    var average2 = _.compose(Math.floor, calcAverage, getStudents);
    assert.equal(average2(roster), average);

    var average3 = function(roster) {
        return _.chain(roster).filter(function (student) {
                return student.enrolled > 1
            }).pluck('grade').average().value();
    };
    assert.equal(average3(roster), average);
});



//QUnit.test(" Fucntional version of getCountry", function (assert) {
//
//    var princeton = new School('Princeton', new Address2('London','England'));
//    var student = new Student('Alan', 'Turing', princeton);
//
//    var getCountry = function(student) {
//        return Optional.of(student).map('getSchool').map('getAddress').map('getCountry').getOrElse('Unknown');
//    };
//
//    assert.equal(getCountry(student), 'England');
//
//    // Imperative version
//    //function getCountry(student) {
//    //    var school = student.getSchool();
//    //    if(school !== null) {
//    //        var addr = school.getAddress();
//    //        if(addr !== null) {
//    //            var country = addr.getCountry();
//    //            return country;
//    //        }
//    //        return null;
//    //    }
//    //    return null;
//    //}
//});

QUnit.test(" Functional version of getCountry", function (assert) {

    var grades = [100, 80, 90];

    function append(grades, newGrade) {
        var newGrades = grades.slice(0);
        newGrades.push(newGrade);
        return newGrades;
    }

    assert.equal(append(grades, 95).length, 4);
    assert.equal(grades.length, 3);

    function addAndcomputeAverageGrade1(grades, newGrade) {
        var totalGrades = 0;
        var validNumGrades = 0;
        grades.push(newGrade);
        for(var i = 0; i < grades.length; i++) {
            if(grades[i] !== null || grades[i] !== undefined) {
                totalGrades+= grades[i];
                validNumGrades ++;
            }
        }
        var newAverage = totalGrades / validNumGrades;
        return Math.round(newAverage);
    }

    function average(grades) {
        return grades.reduce(function (total, current) { return total + current; })
            / grades.length;

    }

    var addAndcomputeAverageGrade2 = R.compose(Math.round, average, append);

    assert.equal(addAndcomputeAverageGrade1(grades, 100), 93);

    grades = [100, 80, 90];
    assert.equal(addAndcomputeAverageGrade2(grades, 100), 93);
});
