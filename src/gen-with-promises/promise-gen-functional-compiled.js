// give credit to http://www.html5rocks.com/en/tutorials/es6/promises/
"use strict";
function spawn(generatorFunc) {
    function continuer(verb, arg) {
        var result;
        try {
            result = generator[verb](arg);
        } catch (err) {
            return Promise.reject(err);
        }
        if (result.done) {
            return result.value;
        } else {
            return Promise.resolve(result.value).then(onFulfilled, onRejected);
        }
    }
    var generator = generatorFunc();
    var onFulfilled = continuer.bind(continuer, "next");
    var onRejected = continuer.bind(continuer, "throw");
    return onFulfilled();
}
var HOST = "http://localhost:8000";

var getJSON = function getJSON(url) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.responseType = "json";
        req.open("GET", url);
        req.onload = function () {
            if (req.status == 200) {
                console.log(req.response);
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(Error("IO Error"));
        };
        req.send();
    });
};

var forkJoin = function forkJoin(join, func1, func2) {
    return function (val) {
        return join(func1(val), func2(val));
    };
};
var hide = function hide(id) {
    $("#" + id).hide();
};

var populateRow = function populateRow(columns) {
    var cell_t = _.template("<td><%= a %></td>");
    var row_t = _.template("<tr><%= a %></tr>");
    var obj = function obj(a) {
        return { "a": a };
    };
    var row = R.compose(row_t, obj, R.join(""), R.map(cell_t), R.map(obj));
    return row(columns);
};

var appendToTable = function appendToTable(elementId) {
    return function (row) {
        $("#" + elementId + " tr:last").after(row);
        return $("#" + elementId + " tr").length - 1; // exclude header
    };
};

var average = R.compose(Math.ceil, forkJoin(R.divide, R.sum, R.length));

spawn(regeneratorRuntime.mark(function callee$0$0() {
    var students, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, student, grade, data, unsafeIO;

    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;

                hide("spinner");

                context$1$0.next = 4;
                return getJSON(HOST + "/students");

            case 4:
                students = context$1$0.sent;

                students = R.compose(R.sortBy(R.prop("ssn")), R.filter(function (s) {
                    return s.address.country === "US";
                }))(students);

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$1$0.prev = 9;
                _iterator = students[Symbol.iterator]();

            case 11:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$1$0.next = 23;
                    break;
                }

                student = _step.value;
                context$1$0.next = 15;
                return getJSON(HOST + "/grades?ssn=" + student.ssn);

            case 15:
                context$1$0.t0 = context$1$0.sent;
                grade = average(context$1$0.t0);
                data = R.merge(student, { "grade": grade });
                unsafeIO = IO.of(data).map(R.props(["ssn", "firstname", "lastname", "grade"])).map(populateRow).map(appendToTable("studentRoster"));

                unsafeIO.run();

            case 20:
                _iteratorNormalCompletion = true;
                context$1$0.next = 11;
                break;

            case 23:
                context$1$0.next = 29;
                break;

            case 25:
                context$1$0.prev = 25;
                context$1$0.t1 = context$1$0["catch"](9);
                _didIteratorError = true;
                _iteratorError = context$1$0.t1;

            case 29:
                context$1$0.prev = 29;
                context$1$0.prev = 30;

                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                }

            case 32:
                context$1$0.prev = 32;

                if (!_didIteratorError) {
                    context$1$0.next = 35;
                    break;
                }

                throw _iteratorError;

            case 35:
                return context$1$0.finish(32);

            case 36:
                return context$1$0.finish(29);

            case 37:
                context$1$0.next = 42;
                break;

            case 39:
                context$1$0.prev = 39;
                context$1$0.t2 = context$1$0["catch"](0);

                // try/catch just works, rejected promises are thrown here
                alert("error occurred" + context$1$0.t2);

            case 42:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this, [[0, 39], [9, 25, 29, 37], [30,, 32, 36]]);
}));
// 'yield' effectively does an async wait,
// returning the result of the promise
// Map our array of student urls to
//must use for loop you cannot use yield within another function
// Wait for each student grade to be ready, then add it to the page

//# sourceMappingURL=promise-gen-functional-compiled.js.map