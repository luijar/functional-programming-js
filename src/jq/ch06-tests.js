/**
 * Unit testing with UI code
 */
QUnit.test("addToRoster: cleanInput", function (assert) {


    var input = ['', '-44-44-', '44444', '    4    ', '   4-4   '];
    var assertions = ['', '4444', '44444', '4', '44'];

    assert.expect(input.length);
    input.forEach(function (val, key) {
        assert.equal(cleanInput(val), assertions[key]);
    });
});


QUnit.test("addToRoster: checkLengthSsn", function (assert) {

    //Either.prototype.isLeft = false
    //Left.prototype.isLeft   = true
    //
    //Either.prototype.isRight = false
    //Right.prototype.isRight  = true

    assert.ok(checkLengthSsn('444444444').isRight);
    assert.ok(checkLengthSsn('').isLeft);
    assert.ok(checkLengthSsn('44444444').isLeft);
    assert.equal(checkLengthSsn('444444444').chain(R.length), 9);
});


QUnit.test("addToRoster: findStudent", function (assert) {

    var MockStore = function() {
        var students = {
            '444444444': new Student('Alonzo', 'Church').setSsn('444-44-4444'),
            '555555555': new Student('Alan', 'Turing').setSsn('555-55-5555')
        };

        return {
            get: function(id) {
                return students[id];
            }
        };
    };

    var findStudent = safefetchRecord(MockStore());

    assert.ok(findStudent('444444444').isRight);
    assert.ok(findStudent('4').isLeft);
    assert.equal(findStudent('444444444').chain(R.identity).ssn, '444-44-4444');
});


//
//QUnit.test("Testing addToRoster", function (assert) {
//
//    var testStudentId1 = '444-44-4444';
//    var testStudentId2 = '555-55-5555';
//    assert.equal(addToRoster(testStudentId1).run(), 1);
//    assert.equal(addToRoster(testStudentId2).run(), 2);
//});
