'use strict';

var map = R.curry(function (f, container) {
    return container.map(f);
});

var chain = R.curry(function (f, container) {
    return container.chain(f);
});

var lift = R.curry(function (f, value) {
    return Maybe.fromNullable(value).map(f);
});

var liftIO = function liftIO(value) {
    return IO.of(value);
};

var appendToTable = function appendToTable(elementId) {
    return function (row) {
        $('#' + elementId + ' tr:last').after(row);
        return $('#' + elementId + ' tr').length - 1; // exclude header
    };
};

var debugLog = _.partial(logger, 'console', 'basic', 'IO Monad Example', 'TRACE');

var trace = R.curry(function (msg, obj) {
    debugLog(msg + ':' + obj);
});

var trim = function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
};

var normalize = function normalize(str) {
    return str.replace(/\-/g, '');
};

var cleanInput = R.compose(R.tap(trace), normalize, R.tap(trace), trim);

var populateRow = function populateRow(columns) {
    var cell_t = _.template('<td><%= a %></td>');
    var row_t = _.template('<tr><%= a %></tr>');
    var obj = function obj(a) {
        return { 'a': a };
    };
    var row = R.compose(row_t, obj, R.join(''), R.map(cell_t), R.map(obj));
    return row(columns);
};

var safeFetchRecord = R.curry(function (store, studentId) {
    return Either.fromNullable(store.get(studentId)).getOrElseThrow('Student not found with ID: ' + studentId);
});

var validLength = function validLength(len, str) {
    return str.length === len;
};

var checkLengthSsn = function checkLengthSsn(str) {
    return Either.of(str).filter(validLength.bind(undefined, 9)).getOrElseThrow('Input: ' + str + ' is not a valid SSN number');
};
var findStudent = safeFetchRecord(Store('students'));

// Alternate implementation
var addToRoster = R.compose(map(appendToTable('studentRoster')), liftIO, chain(populateRow), map(R.props(['ssn', 'firstname', 'lastname'])), map(findStudent), map(checkLengthSsn), lift(cleanInput));

//# sourceMappingURL=functional-program-compiled.js.map