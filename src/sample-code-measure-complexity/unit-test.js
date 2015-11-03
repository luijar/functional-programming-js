
// ======= 100 % code coverage ===================== //
//QUnit.test("Imperarative Add To Roster with invalid input", function (assert) {
//    assert.throws(
//        function() {
//            var result = addToRoster('123');
//            assert.equal(result, 1);
//        },
//        'Throws error with invalid input'
//    );
//});
//
//// 66%
//QUnit.test("Imperarative Add To Roster with invalid user", function (assert) {
//    assert.throws(
//        function() {
//            var result = addToRoster('666-66-6666');
//            assert.equal(result, 1);
//        },
//        'Throws error with invalid input'
//    );
//});

// 78%
//QUnit.test("Imperative Add To Roster with valid user", function (assert) {
//    var result = addToRoster('444-44-4444');
//    assert.equal(result, 1);
//});

QUnit.test("Imperative Add To Roster with null", function (assert) {
    var result = addToRoster(null);
    assert.equal(result, 0);
});



// ======= 100 % code coverage ===================== //
// %79
//QUnit.test("Functional Add To Roster with invalid input", function (assert) {
//    assert.throws(
//        function() {
//            addToRoster('xxx').run();
//        },
//        'Throws error with invalid input'
//    );
//});

// 79%
//QUnit.test("Functional Add To Roster with invalid user", function (assert) {
//    assert.throws(
//        function() {
//            addToRoster('666-66-6666').run();
//        },
//        'Throws error with invalid input'
//    );
//});
//
//// 100%
//QUnit.test("Functional Add To Roster with valid user", function (assert) {
//    var result = addToRoster('444-44-4444').run();
//    assert.equal(result, 1);
//});
// 67%
//QUnit.test("Functional Add To Roster with null", function (assert) {
//    var result = addToRoster(null).run();
//    assert.equal(result, 0);
//});


//QUnit.test("Functional Check Length SSN", function (assert) {
//    var output = checkLengthSsn('123456789');
//    assert.equal(output, '123456789');
//});
//
//QUnit.test("Functional Check Length SSN invalid", function (assert) {
//
//    assert.throws(
//        function() {
//            checkLengthSsn('123');
//        },
//        'Throws error with invalid input'
//    );
//});


