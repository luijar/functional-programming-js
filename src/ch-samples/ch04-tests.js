/**
 * Unit tests for Chapter 04 code
 *
 * Author: Luis Atencio
 */

"use strict";

QUnit.test("CH04 - Tuple 1", function (assert) {

    var p1 = new Person().setFirstname('Alonzo').setLastname('Church').setBirth(1903);
    var p2 = new Person().setFirstname('Stephen').setLastname('Kleene').setBirth(1909);

    function findPersonBornIn(arr, year) {
        var result = _(arr).find(function (p) {
            return p.getBirth() === year;
        });
        var person = Tuple('string', 'number');
        return new person(result.getFullName(), result.getBirth());
    }

    var tuple = findPersonBornIn([p1, p2], 1903);
    assert.equal(tuple._1, p1.getFullName());
    //tuple._1 = 'Something else';  (not allowed)
    //assert.equal(tuple._1, p1.getFullName());
    assert.equal(tuple.toString(), '(Alonzo Church, 1903)');
    assert.equal(tuple + "", '(Alonzo Church, 1903)');
});

QUnit.test("CH04 - Tuple 2", function (assert) {

    var Pair = Tuple('string', 'string');
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

QUnit.test("CH04 - Tuple 3 with Error", function (assert) {

    var Pair = Tuple('string', 'string');

    try {
        new Pair(null, 'Barkley');
        assert.fail('Error in test!');
    }
    catch(e) {
        assert.ok(e instanceof ReferenceError);
    }
});

QUnit.test("CH04 - Compose 1", function (assert) {

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

    var sanitizeSsn = _.compose(normalize, trim);
    var isValidSsn = _.compose(checkLengthSsn, sanitizeSsn);

    assert.equal(sanitizeSsn(' 444-44-4444 '), '444444444');
    assert.ok(isValidSsn(' 444-44-4444 '));

    Function.prototype.compose = _.compose;

    var isValidSsn2 = checkLengthSsn.compose(normalize).compose(trim);
    assert.ok(isValidSsn2(' 444-44-4444 '));
});


QUnit.test("CH04 - Curry 1", function (assert) {

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

QUnit.test("CH04 - Curry 1 Right", function (assert) {

    var toBase = curry2(parseInt)('111');
    assert.equal(toBase(2), 7);
    assert.equal(toBase(10), 111);
});

QUnit.test("CH04 - Curry Function Templates", function (assert) {

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

QUnit.test("CH04 - Curry Function Templates Logger", function (assert) {

    var log = _.curry(logger)('console', 'json', 'FJS Curry');
    log('ERROR', 'Error condition detected!!');
    assert.ok(true);
});


QUnit.test("CH04 - Curry Function Builder", function (assert) {

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
        var Money = Tuple('number', 'string');
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

QUnit.test("CH04 - Check Type with Curry 2", function (assert) {

    // Type Checks (curry it)
    var checkType = curry2(function(typeDef, actualType) {
        var _type =({}).toString.call(actualType).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        if(_type === typeDef) {
            return _type;
        }
        else {
            throw new TypeError('Type mismatch. Expected [' + typeDef + '] but found [' + _type + ']');
        }
    });

    assert.equal(checkType('string')('Luis'), 'string');
    assert.equal(checkType('number')(3), 'number');
    assert.equal(checkType('date')(new Date()), 'date');
    assert.equal(checkType('object')({}), 'object');
});

QUnit.test("CH04 - Partial 1", function (assert) {

    // Logger function with partial
    var log = _.partial(logger, 'console', 'json', 'FJS Partial');
    log('ERROR', 'Error condition detected!!');

    var errorLog = _.partial(log, 'ERROR');
    errorLog('Error condition detected (using partial)!');
    assert.ok(true);
});

QUnit.test("CH04 - Bind 1", function (assert) {

    // Logger function with partial
    var log = logger.bind(undefined, 'console', 'json', 'FJS Binding');
    log('ERROR', 'Error condition detected!!');

    assert.ok(true);
});

QUnit.test("CH04 - Partial 2", function (assert) {

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

QUnit.test("CH04 - Binding 2", function (assert) {

    var Scheduler = (function () {
        var timedFn = _.bind(setTimeout, null, _, _);

        return {
            delay5:  _.partial(timedFn, _, 5),
            delay10: _.partial(timedFn, _, 10),
            delay:   _.partial(timedFn, _, _)
        };
    })();

    Scheduler.delay(function () {
        console.log('once!')
    }, 20);
    assert.ok(true);
});


QUnit.test("CH04 - Partial 3", function (assert) {

    String.prototype.first = _.partial(String.prototype.substring, 0, _);
    assert.equal('Functional'.first(3), 'Fun');
});


QUnit.test("CH04 - Partial 4", function (assert) {

    String.prototype.asName = _.partial(String.prototype.replace, /(\w+)\s(\w+)/, '$2, $1');
    assert.equal('Alonzo Church'.asName(), 'Church, Alonzo');
});


QUnit.test("CH04 - Partial 5 (Needs Traceur)", function (assert) {

    // Runs with traceur turned on
    //Array.prototype.head = _.partial(Array.prototype.filter, (elt, idx) => idx === 0);
    //assert.equal([1,2,3].head(), 1);
    //assert.equal(['apple',2,3].head(), 'apple');

    //Array.prototype.tail = _.partial(Array.prototype.filter, (elt, idx) => idx > 0);
    assert.ok(true);
});




QUnit.test("CH04 - Compose 1 Compute Highest Grade", function (assert) {

    var students = ['Rosser', 'Turing', 'Kleene', 'Church'];
    var grades   = [80, 100, 90, 99];


    var highestGrade = R.compose(R.head, R.pluck(0), R.reverse, R.sortBy(R.prop(1)), R.zip);
    var result = highestGrade(students, grades);
    assert.equal(result, 'Turing');
});
