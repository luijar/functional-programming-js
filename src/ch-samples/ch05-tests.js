/**
 * Unit tests for Chapter 05 code
 *
 * Author: Luis Atencio
 */

"use strict";

//QUnit.test("CH05 - ", function (assert) {
//
//
//});

QUnit.test("CH05 - Chainig example", function (assert) {

    var result = _(['f', 'u', 'n', 'c', 't', 'i', 'o', 'n', 'a', 'l']).take(3).map( function(s) { return s.toUpperCase()} ).join('');
    assert.equal(result, 'FUN');
});


var Wrapper = function (val) {
    this.val = val;

    this.get = function () {
        return this.val;
    }
};
Wrapper.prototype.map = function (f) {
   if(this.val !== null) {
        return f(this.val);
   }
};
Wrapper.prototype.fmap = function (f) {
    if(this.val !== null) {
        return wrap(this.map(f));
    }
};

// helper function
var wrap = function (val) {
  return new Wrapper(val);
};



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