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



