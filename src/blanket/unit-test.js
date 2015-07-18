
//QUnit.test("Imperarative Add To Roster with invalid input", function (assert) {
//    assert.throws(
//        function() {
//            var result = addToRoster('123');
//            assert.equal(result, 1);
//        },
//        'Throws error with invalid input'
//    );
//});


QUnit.test("Functional Add To Roster with invalid input", function (assert) {
    var result = addToRoster('555-55-5555').run();
    assert.equal(result, 0);
});