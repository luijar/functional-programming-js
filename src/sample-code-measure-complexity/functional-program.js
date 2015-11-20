
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

var append = function (elementId) {
    return function (info) {
        document.querySelector('#' + elementId).innerHTML = info;
        return info;
    };
};

var debugLog = _.partial(logger, 'console', 'basic', 'IO Monad Example', 'TRACE');

var trace = R.curry(function (msg, obj) {debugLog(msg + ':' + obj);});

var trim = function (str) {
    return str.replace(/^\s*|\s*$/g, '');
};

var normalize = function (str) {
    return str.replace(/\-/g, '');
};

var cleanInput = R.compose(R.tap(trace), normalize, R.tap(trace), trim);

var csv = function (columns) {
    return columns.join(', ');
};

var safeFetchRecord = R.curry(function (store, studentId) {
    return Either.fromNullable(store.get(studentId))
        .getOrElseThrow('Student not found with ID: ' + studentId);
});

var validLength = function(len, str) {
    return str.length === len;
};

var checkLengthSsn = function (str) {
    return Either.of(str).filter(validLength.bind(undefined, 9))
        .getOrElseThrow('Input: ' + str + ' is not a valid SSN number');
};
var findStudent = safeFetchRecord(DB('students'));

// Alternate implementation
var showStudent = R.compose(
    map(append('studentRoster')),
    liftIO,
    chain(csv),
    map(R.props(['ssn', 'firstname', 'lastname'])),
    map(findStudent),
    map(checkLengthSsn),
    lift(cleanInput));
