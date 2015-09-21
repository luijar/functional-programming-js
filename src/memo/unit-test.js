var start = function (name) {
    return function () {
        console.time(name);
    }
};

var end = function (name) {
    return function () {
        console.timeEnd(name);
    }
};

QUnit.test("Functional Add To Roster with valid user", function (assert) {
    start('addToRoster without')();
    var result = addToRoster('444-44-4444').run();
    end('addToRoster without')();

    //============================================================
    start('addToRoster with')();
    //result = addToRoster('444-44-4444').run();
    end('addToRoster with')();

    assert.equal(result, 1);
});