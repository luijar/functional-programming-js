/**
 * Functional Programming in JavaScript
 *
 * Unit tests for Chapter 05 code
 *
 * Functors, Monads, and wrappers
 *
 * Author: Luis Atencio
 */

"use strict";
QUnit.module( "Chapter 5" );
QUnit.test("Chainig example", function (assert) {

    var result = _(['f', 'u', 'n', 'c', 't', 'i', 'o', 'n', 'a', 'l']).take(3).map( function(s) { return s.toUpperCase()} ).join('');
    assert.equal(result, 'FUN');
});

QUnit.test("Wrapper 1", function (assert) {

    var wrappedValue = wrap('Alonzo');

    // print the value
    wrappedValue.map(log);

    // extract the value
    assert.equal(wrappedValue.map(R.identity), 'Alonzo');

    assert.equal(wrappedValue.map(R.toUpper), 'ALONZO');

    var wrappedNull = wrap(null);
    assert.equal(wrappedNull.map(log));
});


QUnit.test("Addition with simple functor", function (assert) {

    var two = wrap(2);

    var plus = _.curry(function (a, b) {
        return a + b;
    });

    var plus3 = plus(3);
    assert.equal(two.fmap(plus3).val, 5);

});


QUnit.test("Functor law 1", function (assert) {

    var wrappedValue = wrap('Alonzo');

    // extract the value
    assert.equal(wrappedValue.fmap(R.identity).get(), 'Alonzo');
});


QUnit.test("Functor and Logging", function (assert) {


    var infoLogger = _.partial(logger, 'console', 'basic', 'MyLogger', 'INFO');
    var two = wrap(2);

    var plus = _.curry(function (a, b) {
        return a + b;
    });
    var plus3 = plus(3);

    assert.equal(two.fmap(plus3).fmap(R.tap(infoLogger)).get(), 5);
    assert.equal(two.fmap(R.compose(plus3, R.tap(infoLogger))).get(), 5);
});



QUnit.test("Functor and composition", function (assert) {

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

QUnit.test("Maybe function", function (assert) {

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


QUnit.test("Nesting wrappers", function (assert) {

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


QUnit.test("Identity Monad", function (assert) {

    var student = new Student('Alonzo', 'Church', 'Princeton')
        .setAddress('New Jersey', 'USA');


    var infoLog = _.partial(logger, 'console', 'basic', 'FJS Partial', 'INFO');
    var country = Id.of(student).map(R.prop('address')).map(R.tap(infoLog)).map(R.prop('country')).extract();
    assert.equal(country, 'USA');

});

QUnit.test("Join Identity monad", function (assert) {

    var value = Id.of(Id.of(Id.of(42)));
    assert.equal(value.join().extract(), 42);
});


QUnit.test("Maybe monad 1", function (assert) {

    var value = Maybe.of(42);
    assert.equal(value.get(), 42);
});

QUnit.test("Maybe monad 2", function (assert) {

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

QUnit.test("Maybe monad 3", function (assert) {

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

QUnit.test("Maybe monad 3", function (assert) {

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
        return Maybe.fromNullable(studentDao.save(maybeStudent.getOrElse(new Student())));
    });

    var findStudent = fetchStudentById(NullDAO('student'));
    var saveStudent = saveStudentObject(NullDAO('student'));

    var result = findStudent('444-44-4444').map(R.prop('firstname'));

    assert.equal(result.getOrElse('Enter user name'), 'Enter user name');
});

QUnit.test("Number Maybe ", function (assert) {


    function NumberMaybe() {
        Maybe.call(this);
    }
    NumberMaybe.prototype = Object.create(Maybe.prototype);
    NumberMaybe.prototype.constructor = NumberMaybe;

    NumberMaybe.fromNullable = function (a) {
        return a != null &&  !(isNaN(a) || a === Infinity) ? new Just(a)
            : new Nothing()
    };
    NumberMaybe.prototype.fromNullable = NumberMaybe.fromNullable;


    assert.equal(1/0, Infinity);
    assert.ok(isNaN(parseInt("blabla")));

    var plus = _.curry(function (a, b) {
        return a + b;
    });

    var plus3 = plus(3);

    var result = NumberMaybe.fromNullable(1 / 0).map(plus3).getOrElse(0);
    assert.equal(result, 0);

    var result = NumberMaybe.fromNullable(parseInt("blabla")).map(plus3).getOrElse(0);
    assert.equal(result, 0);

    var result = NumberMaybe.fromNullable(parseInt("100")).map(plus3).getOrElse(0);
    assert.equal(result, 103);
});

QUnit.test("Either monad 1", function (assert) {

    // Fake DAO
    var NullDAO = function() {
        return {
            get: function (id) {
                return null;
            }
        };
    };

    var fetchStudentById = R.curry(function (studentDao, id) {
        var student = studentDao.get(id);
        if(student) {
            return Either.of(student);
        }
        return Either.Left('Student not found with ID: ' + id);
    });

    var findStudent = fetchStudentById(NullDAO('student'));

    var errorLogger = _.partial(logger, 'console', 'basic', 'MyLogger', 'ERROR');

    findStudent('444-44-4444').orElse(errorLogger);
    assert.ok(true);
});


QUnit.test("Either monad 2", function (assert) {

    function decode(url) {
        try {
            var result = decodeURIComponent(url); // throws URIError
            return Either.of(result);
        }
        catch (uriError) {
            return Either.Left(uriError.message);
        }
    }

    assert.equal(decode('%').orElse(_.identity), 'URI malformed');
    assert.equal(decode('http%3A%2F%2Fexample.com').get(), 'http://example.com');
});

QUnit.test("Ramda test", function (assert) {

    var obj = {x: 1, y: {z: 'z'}};
    var zLens = R.lens(R.path(['y', 'z']), R.assocPath(['y', 'z']));


    var z = R.view(zLens, obj);            //=> z
    assert.equal(z, 'z');

    //R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
    //R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
});

QUnit.test("Composition Monad 1", function (assert) {

    // Mock DB service
    var Store = function(_) {
        return {
            getRecord: function(id) {
                var s = new Student('Alonzo', 'Church');
                s.ssn = id;
                return s;
                //return null;
            }
        };
    };

    // Mock payment service
    var PaymentService = function (money, rate) {
        return {
            submit: function (student) {
                console.log(student.getFullName() + ' paid in full: ' + money);
                return new Money(money._1 + (money._1 * rate), money._2);
            }
        }
    };


    var EvenBus = function (config) {

        var Scheduler = (function () {
            var timedFn = _.bind(setTimeout, undefined, _, _);

            return {
                delay5:  _.partial(timedFn, _, 5),
                delay10: _.partial(timedFn, _, 10),
                delay:   _.partial(timedFn, _, _)
            };
        })();

        return {
            fireEvent: function(str) {
                if(config && config.delay === 'none') {
                    Scheduler.delay(log(str), 0);
                }
                else {
                    Scheduler.delay10(log(str));
                }
            }
        };
    };

    // safefetchRecord :: Store, string -> Either<Student>
    var safefetchRecord = R.curry(function (dao, studentId) {
        var student = dao.getRecord(studentId);
        if(student) {
            return Either.of(student);
        }
        return Either.Left('Student not found with ID: ' + studentId);
    });

    // sendPayment :: Payment -> Money
    var sendPayment = R.curry(function (payment, student) {
        return payment.submit(student)
    });

    // sendNotification :: EventQ, Money -> void
    var fireNotification = R.curry(function(eventQueue, money) {
        eventQueue.fireEvent('Payment sent: '+ money);
        return money;
    });

    var debugLog = _.partial(logger, 'console', 'basic', 'Monad Example', 'TRACE');
    var errorLog = _.partial(logger, 'console', 'basic', 'Monad Example', 'ERROR');
    var trace = R.curry(function (msg, _) {debugLog(msg);});

    var trim = function (str) {
        return str.replace(/^\s*|\s*$/g, '');
    };

    var normalize = function (str) {
        return str.replace(/\-/g, '');
    };

    var validLength = function(len, str) {
        if(str.length === len) {
            return Either.of(str);
        }
        return Either.Left('Input: ' + str + ' length does is not equal to: ' + len);
    };

    var cleanInput = R.compose(R.tap(trace), normalize, R.tap(trace), trim);

    var checkLengthSsn = validLength.bind(undefined, 9);

    function processPayment(studentId) {
        return Maybe.fromNullable(studentId)
            .map  (cleanInput)
            .chain(checkLengthSsn)
            .chain(safefetchRecord (Store('students')))
            .map  (sendPayment     (PaymentService(new Money(100, 'USD'),  .06)))
            .map  (fireNotification(EvenBus({delay: 'none'})));
    }

    var unit = function (val) {
        return Either.fromNullable(val);
    };

    var map = R.curry(function (f, container) {
        return container.map(f);
    });

    var chain = R.curry(function (f, container) {
        return container.chain(f);
    });

    var processPayment2 = R.compose(
        map(fireNotification(EvenBus({delay: 'none'}))),
        R.tap(trace('Payment has been submitted')),
        map(sendPayment  (PaymentService(new Money(100, 'USD'),  .06))),
        R.tap(trace('Record fetched successfully!')),
        chain(safefetchRecord (Store('students'))),
        R.tap(trace('Input was valid')),
        chain(checkLengthSsn),
        map(cleanInput),
        Maybe.fromNullable);

    var studentId = '444-44-4444';

    processPayment(studentId).orElse(errorLog);
    assert.ok(true);
});



QUnit.test("IO Monad 1", function (assert) {

    var trace = _.partial(logger, 'console', 'basic', 'MyLogger', 'TRACE');

    var read = function (id) {
        return function () {
            return $('#' + id).text();
        };
    };

    var write = function(id) {
        return (function(value) {
            $('#' + id).text(value)
        });
    };

    var changeToUpperIO = IO.from(read("chap06-test")).map(_.startCase).map(write("chap06-test"));
    changeToUpperIO.run();
    assert.equal($('#chap06-test').text(), 'Alonzo Church');
});