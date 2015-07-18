var safeFetchRecord = R.curry(function (store, studentId) {
    var student = store.get(studentId);
    if(student) {
        return Either.of(student);
    }
    return Either.Left('Student not found with ID: ' + studentId);
});

var debugLog = _.partial(logger, 'console', 'basic', 'IO Monad Example', 'TRACE');

var trace = R.curry(function (msg, obj) {debugLog(msg + ':' + obj);});

var trim = function (str) {
    return str.replace(/^\s*|\s*$/g, '');
};

var normalize = function (str) {
    return str.replace(/\-/g, '');
};

var validLength = function(len, str) {
    if(str.length === len) {
        return Either.of(str);
    }
    return Either.Left('Input: ' + str + ' length does is not equal to: ' + len);
};

var cleanInput = R.compose(R.tap(trace), normalize, R.tap(trace), trim);

var checkLengthSsn = validLength.bind(undefined, 9);

var map = R.curry(function (f, container) {
    return container.map(f);
});

var chain = R.curry(function (f, container) {
    return container.chain(f);
});

var lift = R.curry(function (f, value) {
    return Maybe.fromNullable(value).map(f);
});

var liftIO = function (value) {
    return IO.of(value);
};

var appendToTable = function (elementId) {
    return function (row) {
        $('#' + elementId + ' tr:last').after(row);
        return $('#' + elementId + ' tr').length - 1; // exclude header
    };
};

populateRow = function (columns) {
    var cell_t = _.template('<td><%= a %></td>');
    var row_t  = _.template('<tr><%= a %></tr>');
    var obj = function(a) {
        return {'a': a};
    };
    var row = R.compose(row_t, obj, R.join(''), R.map(cell_t), R.map(obj));
    return row(columns);
};

var findStudent = safeFetchRecord(Store('students'));

// Alternate implementation
var addToRoster = R.compose(
    map(appendToTable('studentRoster')),
    liftIO,
    chain(populateRow),
    map(R.props(['ssn', 'firstname', 'lastname'])),
    chain(findStudent),
    chain(checkLengthSsn),
    lift(cleanInput));
