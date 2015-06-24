/**
 * Unit tests for Chapter 05 code
 *
 * Author: Luis Atencio
 */

"use strict";

QUnit.test("CH05 - Chainig example", function (assert) {

    var result = _(['f', 'u', 'n', 'c', 't', 'i', 'o', 'n', 'a', 'l']).take(3).map( function(s) { return s.toUpperCase()} ).join('');
    assert.equal(result, 'FUN');
});

QUnit.test("CH05 - Wrapper 1", function (assert) {

    var wrappedValue = wrap('Alonzo');

    // print the value
    wrappedValue.map(log);

    // extract the value
    assert.equal(wrappedValue.map(R.identity), 'Alonzo');

    assert.equal(wrappedValue.map(R.toUpper), 'ALONZO');

    var wrappedNull = wrap(null);
    assert.equal(wrappedNull.map(log));
});


QUnit.test("CH05 - Addition with simple functor", function (assert) {

    var two = wrap(2);

    var plus = _.curry(function (a, b) {
        return a + b;
    });

    var plus3 = plus(3);
    assert.equal(two.fmap(plus3).val, 5);

});


QUnit.test("CH05 - Functor law 1", function (assert) {

    var wrappedValue = wrap('Alonzo');

    // extract the value
    assert.equal(wrappedValue.fmap(R.identity).get(), 'Alonzo');
});


QUnit.test("CH05 - Functor and Logging", function (assert) {


    var infoLogger = _.partial(logger, 'console', 'basic', 'MyLogger', 'INFO');
    var two = wrap(2);

    var plus = _.curry(function (a, b) {
        return a + b;
    });
    var plus3 = plus(3);

    assert.equal(two.fmap(plus3).fmap(R.tap(infoLogger)).get(), 5);
    assert.equal(two.fmap(R.compose(plus3, R.tap(infoLogger))).get(), 5);
});



QUnit.test("CH05 - Functor and composition", function (assert) {

    var plus = _.curry(function (a, b) {
        return a + b;
    });
    var plus3 = plus(3);
    var plus1 = plus(1);

    // Applicative
    Wrapper.prototype.ap = function(b) {
        return new wrap(this.val(b));
    };

    var add = wrap(plus3).ap(2);
    assert.equal(add.get(), 5);
});

QUnit.test("CH05 - Maybe function", function (assert) {

    function maybe(fn, value) {
        return value === null || value === undefined ? value : fn(value);
    }

    function doWork() {
        return 2;
    }

    var plus = _.curry(function (a, b) {
        return a + b;
    });
    var plus3 = plus(3);
    var plus1 = plus(1);

    assert.equal(maybe(plus, undefined), undefined);
    assert.equal(maybe(plus3, 2), 5);
    assert.equal(maybe(plus3, maybe(plus1, doWork())), 6);
    assert.equal(maybe(R.compose(plus3, plus1), doWork()), 6);
});


QUnit.test("CH05 - Nesting wrappers", function (assert) {

    var DAO = function(db) {
        return {
            get: function (id) {
                return new Student('Alonzo', 'Church', 'Princeton');
            }
        };
    };

    var fetchStudentById = R.curry(function (studentDao, id) {
        return wrap(studentDao.get(id));
    });

    function extractAddress(wrappedStudent) {
        return wrap(wrappedStudent.fmap(R.prop('firstname')));
    }

    var studentAddress = R.compose(extractAddress, fetchStudentById(DAO('student')));
    assert.equal(studentAddress('444-44-4444').get().get(), 'Alonzo');
});


QUnit.test("CH05 - Identity Monad", function (assert) {

    var student = new Student('Alonzo', 'Church', 'Princeton')
        .setAddress('New Jersey', 'USA');


    var infoLog = _.partial(logger, 'console', 'basic', 'FJS Partial', 'INFO');
    var country = Id.of(student).map(R.prop('address')).map(R.tap(infoLog)).map(R.prop('country')).extract();
    assert.equal(country, 'USA');

});

QUnit.test("CH05 - Join Identity monad", function (assert) {

    var value = Id.of(Id.of(Id.of(42)));
    assert.equal(value.join().extract(), 42);
});


QUnit.test("CH05 - Maybe monad 1", function (assert) {

    var value = Maybe.of(42);
    assert.equal(value.get(), 42);
});

QUnit.test("CH05 - Maybe monad 2", function (assert) {

    var DAO = function(db) {
        return {
            get: function (id) {
                return new Student('Alonzo', 'Church', 'Princeton');
            }
        };
    };

    var fetchStudentById = R.curry(function (studentDao, id) {
        return Maybe.fromNullable(studentDao.get(id));
    });

    var findStudent = fetchStudentById(DAO('student'));
    var result = findStudent('444-44-4444').map(R.prop('firstname'));
    assert.equal(result.get(), 'Alonzo');
});

QUnit.test("CH05 - Maybe monad 3", function (assert) {

    var NullDAO = function(db) {
        return {
            get: function (id) {
                return null;
            }
        };
    };

    var fetchStudentById = R.curry(function (studentDao, id) {
        return Maybe.fromNullable(studentDao.get(id));
    });


    var findStudent = fetchStudentById(NullDAO('student'));
    var result = findStudent('444-44-4444').map(R.prop('firstname'));
    assert.equal(result.getOrElse('Unknown'), 'Unknown');
});

QUnit.test("CH05 - Maybe monad 3", function (assert) {

    var NullDAO = function(db) {
        return {
            get: function (id) {
                return null;
            },
            save: function (s) {
                console.log('student has been saved');
            }
        };
    };

    var fetchStudentById = R.curry(function (studentDao, id) {
        return Maybe.fromNullable(studentDao.get(id));
    });

    var saveStudentObject = R.curry(function (studentDao, maybeStudent) {
        return studentDao.save(maybeStudent.getOrElse(new Student()));
    });

    var findStudent = fetchStudentById(NullDAO('student'));
    var saveStudent = saveStudentObject(NullDAO('student'));

    var result = findStudent('444-44-4444').map(R.prop('firstname'));

    findStudent('444-44-4444').map(R.prop('firstname'));


    assert.equal(result.getOrElse('Unknown'), 'Unknown');
});