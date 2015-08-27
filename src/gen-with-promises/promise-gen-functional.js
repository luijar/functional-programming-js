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
const HOST = 'http://localhost:8000';

var getJSON = function (url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', url);
        req.onload = function() {
            if(req.status == 200) {
                console.log(req.response);
                resolve(req.response);
            }
            else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(Error("IO Error"));
        };
        req.send();
    });
};

var forkJoin = function(join, func1, func2){
    return function(val) {
        return join(func1(val), func2(val));
    };
};
var hide = function (id) {$('#' + id).hide()};

var populateRow = function (columns) {
    var cell_t = _.template('<td><%= a %></td>');
    var row_t  = _.template('<tr><%= a %></tr>');
    var obj = function(a) {
        return {'a': a};
    };
    var row = R.compose(row_t, obj, R.join(''), R.map(cell_t), R.map(obj));
    return row(columns);
};

var appendToTable = function (elementId) {
    return function (row) {
        $('#' + elementId + ' tr:last').after(row);
        return $('#' + elementId + ' tr').length - 1; // exclude header
    };
};

var average = R.compose(Math.ceil, forkJoin(R.divide, R.sum, R.length));

spawn(function *() {
    try {
        hide('spinner');

        // 'yield' effectively does an async wait,
        // returning the result of the promise
        // Map our array of student urls to
        let students = yield getJSON(HOST + '/students');
        students = R.compose(
                         R.sortBy(R.prop('ssn')),
                         R.filter(function (s) { return s.address.country === 'US'}))(students);

        for (let student of students) {  //must use for loop you cannot use yield within another function
            // Wait for each student grade to be ready, then add it to the page
            let grade = average(yield getJSON(HOST + '/grades?ssn=' + student.ssn));
            const data = R.merge(student, {'grade': grade});
            var unsafeIO = IO.of(data).map(R.props(['ssn', 'firstname', 'lastname', 'grade']))
                    .map(populateRow).map(appendToTable('studentRoster'));
            unsafeIO.run();
        }
    }
    catch (err) {
        // try/catch just works, rejected promises are thrown here
        alert('error occurred' + err);
    }
});