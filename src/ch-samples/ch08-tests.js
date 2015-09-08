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

    var fetchStudents = Promise.resolve($.getJSON(HOST + '/students'));

    fetchStudents.then(function(result) {
        console.log('Students found: ' + result.length);
    },
    function (error) {
        console.error('Error!');
    });
    assert.ok(true);
});

QUnit.test("Imperative promise", function (assert) {

    var addStudentToRoster = function (student, grades) {
        alert('Imperative: ' + student.firstname + " " + grades);
    };
    $.getJSON(HOST + '/students', function(students) {  // #A
            students.sort(function(a, b){
                if(a.firstname < b.firstname) return -1;
                if(a.firstname > b.firstname) return 1;
                return 0;
            });
            for(let i = 0; i < students.length; i++) {
                var student = students[i];
                if(student.address.country === 'US') {
                    $.getJSON(HOST + '/grades?ssn=' + student.ssn,  // #B
                        function (grades) {
                            addStudentToRoster(student, grades); // #C
                        },
                        function (error) { // #B
                            alert('Inside grades' + error);
                        });
                }
            }
        }, function (error) { // #A
            console.error(error);
        }
    );
    assert.ok(true);
});


QUnit.test("Promises 2 with filter", function (assert) {

    var addStudentToRoster = function (student, grades) {
        alert(student.firstname + " " + grades);
    };

    Promise.resolve($.getJSON(HOST + '/students'))
        .then(R.filter((s) => s.address.country == 'US'))
        .then(R.reduce(function (sequence, student) {
                return sequence.then(function() {
                    return Promise.resolve($.getJSON(HOST + '/grades?ssn' + student.ssn));
                }).then(function (grades) {
                    addStudentToRoster(student, grades);
                });
            }
            ,Promise.resolve()))
        .catch(function(error) {
            console.error("Failed!" + error);
        });
    assert.ok(true);
});

QUnit.test("Promises 3 with filter", function (assert) {

    var addStudentToRoster = function (student, grades) {
        console.error(student.firstname + " " + grades);
    };

    Promise.resolve($.getJSON(HOST + '/students'))
        .then(R.filter((s) => s.address.country == 'US'))
        .then(R.reduce(function (sequence, student) {
                return sequence.then(function() {
                    return Promise.resolve($.getJSON(HOST + '/grades?ssn' + student.ssn));
                }).then(function (grades) {
                    addStudentToRoster(student, grades);
                });
            }
            ,Promise.resolve()))
        .catch(function(error) {
            console.error("Catch all:" + error);
        });
    assert.ok(true);
});




QUnit.test("Classes", function (assert) {

    class Person {
        constructor(firstname, lastname) {
            this._firstname = firstname;
            this._lastname = lastname;
            this._friends = ['a'];
        }

        set firstname(f) {
            this._firstname = f;
        }

        set lastname(l) {
            this._lastname  = l;
        }

        get firstname() {
            return this._firstname;
        }

        get lastname() {
            return this._lastname;
        }

        set country(c) {
            this._country = c;
        }

        get country() {
            return this._country;
        }

        get getFriendsInSameCountry() {
            var result = [];
            for (var idx in this.friends) {
                var friend = this.friends[idx];
                if (friend.country === this.country) {
                    result.push(friend);
                }
            }
            return result;
        }
    }

    class Student extends Person {
        constructor(firstname, lastname, school) {
            super(firstname, lastname);
            this._school = school;
        }

        set school(s) {
            this._school = s;
        }

        get school() {
            return this._school;
        }

        get getFriendsInSameCountryAndSchool() {
            var closeFriends = super.getFriendsInSameCountry();
            var result = [];
            for (var idx in closeFriends) {
                var student = closeFriends[idx];
                if (friend.school === this.school) {
                    result.push(friend);
                }
            }
            return result;
        };
    }

    var s = new Student('Luis', 'Atencio', 'Princeton');
    assert.equal(s.school, 'Princeton');
});

