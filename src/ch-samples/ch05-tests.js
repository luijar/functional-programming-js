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
};
Wrapper.prototype.map = function (f) {
   if(this.val !== null) {
        return f(this.val);
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


//QUnit.test("CH05 - Wrapper with Ramda", function (assert) {
//
//    var map = function (f, val) {
//        if(val !== null) {
//            return f(val);
//        }
//    };
//
//    var value = R.wrap(R.identity, map);
//});
