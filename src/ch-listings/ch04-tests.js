/**
 * Functional Programming in JavaScript
 *
 * Unit tests for Chapter 04 code
 *
 * Curry, Partial application, and Composition
 *
 * Author: Luis Atencio
 */
"use strict";
QUnit.module( "Chapter 4" );

QUnit.test("Simple Composition", function (assert) {

        var str = "We can only see a short distance ahead but we can see plenty there that needs to be done";

        var explode = (str) => str.split(/\s+/);

        var size = (arr) => arr.length;

        var countWords = R.compose(size, explode);
        assert.equal(countWords(str), 19);
});

//
//QUnit.test("Tuple 1", function (assert) {
//
//    var p1 = new Person().setFirstname('Alonzo').setLastname('Church').setBirth(1903);
//    var p2 = new Person().setFirstname('Stephen').setLastname('Kleene').setBirth(1909);
//
//    function findPersonBornIn(arr, year) {
//        var result = _(arr).find(function (p) {
//            return p.getBirth() === year;
//        });
//        var person = Tuple(String, Number);
//        return new person(result.getFullName(), result.getBirth());
//    }
//
//    var tuple = findPersonBornIn([p1, p2], 1903);
//    assert.equal(tuple._1, p1.getFullName());
//    //tuple._1 = 'Something else';  (not allowed)
//    //assert.equal(tuple._1, p1.getFullName());
//    assert.equal(tuple.toString(), '(Alonzo Church, 1903)');
//    assert.equal(tuple + "", '(Alonzo Church, 1903)');
//});

QUnit.test("Tuple 2", function (assert) {

    var Pair = Tuple(String, String);
    var name = new Pair('Barkley', 'Rosser');
    assert.equal(name._1, 'Barkley');
    assert.equal(name._2, 'Rosser')

    try {
        new Pair('J', 'Barkley', 'Rosser');
        assert.fail('Error in test!');
    }
    catch(e) {
        assert.ok(e instanceof TypeError);
    }
});

QUnit.test("Tuple 3 with Error", function (assert) {

    var Pair = Tuple(String, String);

    try {
        new Pair(null, 'Barkley');
        assert.fail('Error in test!');
    }
    catch(e) {
        assert.ok(e instanceof ReferenceError);
    }
});

QUnit.test("Compose 1", function (assert) {

    var trim = (str) => str.replace(/^\s*|\s*$/g, '');

    var normalize = (str) => str.replace(/\-/g, '');

    var validLength = (param, str) => str.length === param;

    var checkLengthSsn = validLength.bind(undefined, 9);

    var sanitizeSsn = R.compose(normalize, trim);
    var isValidSsn = R.compose(checkLengthSsn, sanitizeSsn);

    assert.equal(sanitizeSsn(' 444-44-4444 '), '444444444');
    assert.ok(isValidSsn(' 444-44-4444 '));

    Function.prototype.compose = R.compose;

    var isValidSsn2 = checkLengthSsn.compose(normalize).compose(trim);
    assert.ok(isValidSsn2(' 444-44-4444 '));
});


QUnit.test("Curry 1", function (assert) {

   function curry2(fn) {
        return function(secondArg) {
            return function(firstArg) {
                return fn(firstArg, secondArg);
            };
        };
    }

    var parseHex = curry2(parseInt)(16);
    assert.equal(parseHex('A'), 10);
});

QUnit.test("Curry 1 Right", function (assert) {

    var toBase = curry2(parseInt)('111');
    assert.equal(toBase(2), 7);
    assert.equal(toBase(10), 111);
});

QUnit.test("Curry Function Templates", function (assert) {

    var student = _.curry(function (school, lname, fname) {
        return new Student(fname, lname, school);
    });

    var princeton = student('Princeton');
    var church = princeton('Church', 'Alonzo');
    var turing = princeton('Turing', 'Alan');
    assert.equal(church.getFullName(), 'Alonzo Church');
    assert.equal(turing.getFullName(), 'Alan Turing');
    assert.equal(church.getSchool(), 'Princeton');

});

QUnit.test("Curry Function Templates Logger", function (assert) {

    var log = _.curry(logger)('console', 'json', 'FJS Curry');
    log('ERROR', 'Error condition detected!!');
    assert.ok(true);
});


QUnit.test("Curry Function Builder", function (assert) {

    // Mock payment service
    var PaymentService = function () {
        return {
            submit: function (money) {
                console.log('Paid in full: ' + money);
                return money;
            }
        }
    };

    function getCurrentTaxRateFor(addr) {
        if(addr.getCity() === 'New Jersey') {
            return .07;
        }
        return .06;
    }

    var processPayment = _.curry(function (service, taxRate, currency, amount) {
        var total = amount + (taxRate * amount);
        var Money = Tuple(Number, String);
        return service.submit(new Money(total, currency));
    });

    function makePayment(student, amount) {

        var payment = processPayment(new PaymentService());

        var taxRate = getCurrentTaxRateFor(student.getAddress());
        payment = payment(taxRate);

        if(student.getAddress().getCountry() === 'USA') {
            var pay = payment('USD');
        }
        else {
            pay = payment('Other');
        }

        return pay(amount);
    }


    var student = new Student('Alonzo', 'Church', 'Princeton')
        .setAddress('New Jersey', 'USA');

    var result = makePayment(student, 100);
    assert.equal(result._1, 107);
    assert.equal(result._2, 'USD');
});

QUnit.test("Check Type with Curry 2", function (assert) {

    // Type Checks (curry it)
    var checkType = curry2(function(typeDef, actualType) {
        if(R.is(typeDef, actualType)) {
            return actualType;
        }
        else {
            throw new TypeError('Type mismatch. Expected [' + typeDef + '] but found [' + typeof actualType + ']');
        }
    });

    assert.ok(checkType(String)('Luis'));
    assert.ok(checkType(Number)(3));
    assert.ok(checkType(Date)(new Date()));
    assert.ok(checkType(Object)({}));
    assert.ok(checkType(Boolean)(true));
    //assert.ok(!checkType(Boolean)("A"));
});

QUnit.test("Partial 1", function (assert) {

    // Logger function with partial
    var log = _.partial(logger, 'console', 'json', 'FJS Partial');
    log('ERROR', 'Error condition detected!!');

    var errorLog = _.partial(log, 'ERROR');
    errorLog('Error condition detected (using partial)!');
    assert.ok(true);
});

QUnit.test("Bind 1", function (assert) {

    // Logger function with partial
    var log = logger.bind(undefined, 'console', 'json', 'FJS Binding');
    log('ERROR', 'Error condition detected!!');

    assert.ok(true);
});

QUnit.test("Partial 2", function (assert) {

    var logger2 = function (level, message, name, appender, layout) {
        var appenders = {
            'alert': new Log4js.JSAlertAppender(),
            'console': new Log4js.BrowserConsoleAppender()
        };
        var layouts = {
            'basic': new Log4js.BasicLayout(),
            'json': new Log4js.JSONLayout(),
            'xml' : new Log4js.XMLLayout()
        };
        var appender = appenders[appender];
        appender.setLayout(layouts[layout]);
        var logger = new Log4js.getLogger(name);
        logger.addAppender(appender);
        logger.log(level, message, null);
    };

    // Logger function with partial
    var log = _.partial(logger2, _, _, 'FJS', 'console', 'json');
    log('DEBUG', 'Writing a debug message to the browser console!');
    assert.ok(true);
});

QUnit.test("Binding 2", function (assert) {

    var Scheduler = (function () {
        var timedFn = _.bind(setTimeout, undefined, _, _);

        return {
            delay5:  _.partial(timedFn, _, 5),
            delay10: _.partial(timedFn, _, 10),
            delay:   _.partial(timedFn, _, _)
        };
    })();

    Scheduler.delay(function () {
        log('once!')
    }, 20);
    assert.ok(true);
});

QUnit.test("Partial 3", function (assert) {

    String.prototype.first = _.partial(String.prototype.substring, 0, _);
    assert.equal('Functional'.first(3), 'Fun');
});


QUnit.test("Partial 4", function (assert) {

    String.prototype.asName = R.partial(String.prototype.replace, /(\w+)\s(\w+)/, '$2, $1');
    assert.equal('Alonzo Church'.asName(), 'Church, Alonzo');
});


QUnit.test("Partial 5", function (assert) {

    Array.prototype.shallowCopy = _.partial(Array.prototype.map, _.identity);
    var arr1 = [1,2,3];
    assert.equal(arr1.length, 3);
    var arr2 = arr1.shallowCopy();
    assert.equal(arr2.length, 3);
    arr2.push(4);
    assert.equal(arr1.length, 3);
    assert.equal(arr2.length, 4);


    String.prototype.parseCsv = _.partial(String.prototype.split, /,\s*/);
    var results = "Haskell, Curry, Princeton".parseCsv();
    assert.equal(results[0], 'Haskell');

    String.prototype.parseUrl = _.partial(String.prototype.match, /(http[s]?|ftp):\/\/([^:\/\s]+)\.([^:\/\s]{2,5})/); //:\/\/([^:\/\s]+)\.([^:\/\s]]{2,5})
    assert.equal('http://manning.com'.parseUrl()[1], 'http');

    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    String.prototype.explode = _.partial(String.prototype.match, /[\w]/gi);
    assert.equal(str.explode()[0], 'A');
    assert.equal(str.explode()[1], 'B');


});


QUnit.test("Compose 1 Compute Highest Grade", function (assert) {

    var students = ['Rosser', 'Turing', 'Kleene', 'Church'];
    var grades   = [80, 100, 90, 99];

    var smartestStudent = R.compose(R.head, R.pluck(0), R.reverse, R.sortBy(R.prop(1)), R.zip);
    var result = smartestStudent(students, grades);
    assert.equal(result, 'Turing');
});



QUnit.test("Compose 2 Process Payment", function (assert) {


    // Mock DB service
    var DB = function(objectStore) {
        return {
            getRecord: function(ssn) {
                log('Fetching student by SSN from ' + objectStore);
                return new Student('Alonzo', 'Church');
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

    // fetchStudent :: DB, string -> Student
    var fetchStudent = R.curry(function (db, studentId) {
        return db.getRecord(studentId);
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

    var processPayment = R.compose(fireNotification(EvenBus({delay: 'none'})), log,
        sendPayment(PaymentService(new Money(100, 'USD'),  .06)),log,  fetchStudent(DB('students')));

    var result = processPayment('444-44-4444');
    assert.equal(result._1, 106);

    var processPaymentPipe = R.pipe(fetchStudent(DB('students')),
        sendPayment(PaymentService(new Money(100, 'USD'),  .06)), fireNotification(EvenBus({delay: 'none'})));
    result = processPaymentPipe('444-44-4444');
    assert.equal(result._1, 106);
});


QUnit.test("Point-free [ tr 'A-Z' 'a-z' <names.in | uniq | sort ] ", function (assert) {

    var words = ['Functional', 'Programming', 'Curry', 'Memoization', 'Partial', 'Curry', 'Programming'];
    var _ = R;
    var program = _.pipe(_.map(_.toLower), _.uniq, _.sortBy(_.identity));

    var result = program(words);

    assert.equal(result[0], 'curry');
    assert.equal(result[1], 'functional');
});



QUnit.test("Simple composition", function (assert) {

    var square = function (x) {return x*x};
    var sumsOfSquares = R.compose(R.sum, R.map(square));
    assert.equal(sumsOfSquares([1,2,3]),14);
});

QUnit.test("Lens 1", function (assert) {

     var person = new Person('Alonzo', 'Church');
     var lastnameLens = R.lensProp('lastname');

     assert.equal(R.view(lastnameLens, person), 'Church');
     var mourning = R.set(lastnameLens, 'Mourning', person);
     assert.equal(mourning.getLastName(), 'Mourning');
});


QUnit.test("Lens 2", function (assert) {

    var person = new Person('Alonzo', 'Church');
    person.address = new Address(
        'Alexander St.',
        'Princeton', ZipCode('08544','1234'),
        'NJ', 'USA');

    var addressLens = R.lens(R.path(['address', 'zip']), R.assocPath(['address', 'zip']));

    assert.equal(R.view(addressLens, person).code(), '08544');
});

QUnit.test("Lens 3", function (assert) {

    var person = new Person('Alonzo', 'Church');
    person.address = new Address(
        'Alexander St.',
        'Princeton', ZipCode('08544','1234'),
        'NJ', 'USA');

    var addressLens = objectLens('address');
    var zipLens = objectLens('zip');

    var addressZipLens = zipLens.compose(addressLens);
    var store = addressZipLens.run(person);

    assert.equal(store.get().code(), '08544');
    assert.equal(store.get().location(), '1234');
});

QUnit.test("Lens 4", function (assert) {

    var p1 = new Person().setFirstname('Alonzo').setLastname('Church');
    var p2 = new Person().setFirstname('Haskell').setLastname('Curry');
    var p3 = new Person().setFirstname('Guy').setLastname('Steele');

    var students = [p1, p2, p3];
    var grades   = [80, 100, 90];

    var lastnameLens = objectLens('lastname');

    var getLastname = function (obj) {
        return lastnameLens.run(obj).get();
    };

    var setLastname = R.curry(function (val, obj) {
        return lastnameLens.run(obj).set(val);
    });

    var fn = R.compose(R.map(getLastname), R.map(setLastname('Smith')));
    var result = fn(students);
    assert.equal(result[0], 'Smith');
    assert.equal(result[1], 'Smith');
    assert.equal(result[2], 'Smith');

});

QUnit.test("Lens 5", function (assert) {

    var Person = function (firstname, lastname, year) {

        this.firstname = firstname;
        this.lastname = lastname;
        this.year = year;

    };
    var person = new Person('Alonzo', 'Church', 1903);

    var setter = function (prop, val) {
        var propLens = R.lensProp(prop);
        return R.set(propLens, val, this);
    };

    _.mixin(person, {'set': setter});

    assert.equal(person.firstname, 'Alonzo');
    var person2 = person.set('firstname', 'Bob');
    assert.ok(person !== person2);
    assert.equal(person2.firstname, 'Bob');

});


var spread = R.curryN(2, function(cf, args) {
    var fn = this;
    return args.reduce(function(cf, nextArg) {
        return cf.call(fn, nextArg)
    }, cf);
});

QUnit.test("Curry Spread", function (assert) {

    var add = R.curry(function (x, y, z) {
        return x + y + z;
    });

    assert.equal(spread(add)([3, 2, 100]), 105);
    assert.equal(spread(add, [3, 2, 100]), 105);
});


QUnit.test("Curry Spread 2", function (assert) {

    var computeFinalGrade = R.curry(function (hw1, hw2, midterm, final) {
        return Math.round((hw1 + hw2 + midterm + final) / 4);
    });

    assert.equal(computeFinalGrade(98, 99, 100, 87), 96);
    assert.equal(spread(computeFinalGrade)([98, 99, 100, 87]), 96);
    assert.equal(spread(computeFinalGrade)([98, 99, null, 87]), 71);
});

QUnit.test("OR combinator", function (assert) {

    // Mock DB service
    var DB = function(objectStore) {
        return {
            getRecord: function(ssn) {
                log('Fetching student by SSN from ' + objectStore);
                return new Student('Alonzo', 'Church');
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


    var ErrorService = function () {
        return {
            send: function(error) {
                log('Error sent!!' + error);
            }
        };
    };


    // fetchStudent :: DB, string -> Student
    var fetchStudent = R.curry(function (db, studentId) {
        return db.getRecord(studentId);
    });

    // sendPayment :: Payment -> Money
    var sendPayment = R.curry(function (payment, student) {
        //return payment.submit(student)
        return null;
    });

    // sendNotification :: EventQ, Money -> void
    var fireNotification = R.curry(function(eventQueue, money) {
        eventQueue.fireEvent('Payment sent: '+ money);
        return money;
    });

    var sendError = R.curry(function (errorService, money) {
        errorService.send('Error with payment on ' + money);
    });


    // OR - Combinator
    var alt = function (fun1, func2) {
        return function (val) {
            return fun1(val) || func2(val)
        }
    };

    var sendStatus = fireNotification(EvenBus({delay: 'none'}));
    var sendError = sendError(ErrorService());

    var processPayment = R.compose(alt(sendStatus, sendError), log,
        sendPayment(PaymentService(new Money(100, 'USD'),  .06)),log,  fetchStudent(DB('students')));

    var result = processPayment('444-44-4444');
    assert.ok(result === undefined);
});


QUnit.test("CH034 - Splat combinator", function (assert) {

    var getLetterGrade = function (grade) {
        if (grade >= 90) return 'A';
        if (grade >= 80) return 'B';
        if (grade >= 70) return 'C';
        if (grade >= 60) return 'D';
        return 'F';
    };

    var toLetterGrades = splat(getLetterGrade);

    var result = toLetterGrades([20, 98, 100, 73, 85, 50]);

    assert.equal(result[0], 'F');
});



QUnit.test("Tap combinator", function (assert) {

    var trim = function (str) {
        return str.replace(/^\s*|\s*$/g, '');
    };

    var normalize = function (str) {
        return str.replace(/\-/g, '');
    };

    var validLength = function(param, str) {
        return str.length === param;
    };

    var checkLengthSsn = validLength.bind(undefined, 9);

    var logIt = _.partial(logger, 'console', 'basic', 'Sanitize', 'DEBUG');

    var sanitizeSsn = R.compose(normalize, R.tap(logIt), trim);
    var isValidSsn = R.compose(R.tap(logIt),    checkLengthSsn, R.tap(logIt), sanitizeSsn);

    assert.equal(sanitizeSsn(' 444-44-4444 '), '444444444');
    assert.ok(isValidSsn('  444-44-4444'));
});


QUnit.test("CH03 - Fork combinator", function (assert) {

    var getLetterGrade = function (grade) {
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

    var computeAverageGrade = R.compose(getLetterGrade, forkJoin(R.divide, R.sum, R.length));
    assert.equal(computeAverageGrade([99, 80, 89]), 'B');
});


QUnit.test("CH034 - Fork combinator", function (assert) {

    var Tuple = function( /* types */ ) {
        var prototype = Array.prototype.slice.call(arguments, 0);

        var _tuple =  function( /* values */ ) {

            var values = Array.prototype.slice.call(arguments, 0);

            // Check nulls
            if(values.some(function(val){ return val === null || val === undefined})) {
                return null;
            }

            // Check arity
            if(values.length !== prototype.length) {
                throw new TypeError('Tuple arity does not math its prototype');
            }

            // Check types
            values.map(function(val, index) {
                this['_' + (index + 1)] = val;
            }, this);
            Object.freeze(this);
        };

        _tuple.prototype.toString = function() {
            return '(' + Object.keys(this).map(function(k) {
                    return this[k];
                }, this).join(', ') + ')';
        };
        return _tuple;
    };

    var Node = Tuple(Object, Tuple);

    var element = R.curry(function(val, tuple) {
        return new Node(val, tuple);
    });

    var numbers = element(1, element(2, element(3, element(4, null))));

    assert.equal(numbers._1, 1);
    assert.equal(numbers._2._1, 2);

    var val = numbers._1, next = numbers._2;
    do {
        log(val);
        val = next._1; next = next._2;
    } while(next !== undefined);
});