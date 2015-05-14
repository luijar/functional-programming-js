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
        var result = Lazy(arr).find(function (p) {
            return p.getBirth() === year;
        });
        return new Tuple(result.getFullName(), result.getBirth());
    }

    var tuple = findPersonBornIn([p1, p2], 1903);
    assert.equal(tuple._1, p1.getFullName());
    assert.equal(tuple.toString(), '(Alonzo Church, 1903)');
    assert.equal(tuple + "", '(Alonzo Church, 1903)');
});

