/**
 * Unit testing with UI code
 */
QUnit.test("cleanInput", function (assert) {


    var input = ['', '-44-44-', '44444', '    4    ', '   4-4   '];
    var assertions = ['', '4444', '44444', '4', '44'];

    assert.expect(input.length);
    input.forEach(function (val, key) {
        assert.equal(cleanInput(val), assertions[key]);
    });
});


QUnit.test("checkLengthSsn", function (assert) {

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


QUnit.test("findStudent returning null", function (assert) {

    var studentStore = Store('students');
    var mockContext = sinon.mock(studentStore);

    mockContext.expects("get").once().returns(null);

    var findStudent = safefetchRecord(studentStore);

    assert.ok(findStudent('xxx-xx-xxxx').isLeft);
    mockContext.verify();
    mockContext.restore();
});


QUnit.test("findStudent returning valid user", function (assert) {

    var studentStore = Store('students');
    var mockContext = sinon.mock(studentStore);

    mockContext.expects("get").once().returns(new Student('Alonzo', 'Church', 'Princeton').setSsn('444-44-4444'));

    var findStudent = safefetchRecord(studentStore);

    assert.ok(findStudent('444-44-4444').isRight);
    mockContext.verify();
    mockContext.restore();
});

QUnit.test("populateRow", function (assert) {

    assert.equal(populateRow(['']), '<tr><td></td></tr>');
    assert.equal(populateRow(['Alonzo']), '<tr><td>Alonzo</td></tr>');
    assert.equal(populateRow(['Alonzo', 'Church']), '<tr><td>Alonzo</td><td>Church</td></tr>');
    assert.equal(populateRow(['Alonzo', '', 'Church']), '<tr><td>Alonzo</td><td></td><td>Church</td></tr>');
});


//
//QUnit.test("Testing addToRoster", function (assert) {
//
//    var testStudentId1 = '444-44-4444';
//    var testStudentId2 = '555-55-5555';
//    assert.equal(addToRoster(testStudentId1).run(), 1);
//    assert.equal(addToRoster(testStudentId2).run(), 2);
//});
