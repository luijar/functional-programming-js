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
var hide = (id) => $('#' + id).hide();

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


// 1
getJSON(HOST + '/students')
    .then(hide('spinner'))
    .then(R.sortBy(R.prop('ssn')))
    .then(R.filter((s) => s.address.country == 'US'))
    .then(R.map(function (student) {
            return getJSON(HOST + '/grades?ssn=' + student.ssn)
                .then(R.compose(Math.ceil, forkJoin(R.divide, R.sum, R.length)))
                .then(function (grade) {
                    const data = R.merge(student, {'grade': grade});
                    var unsafeIO = IO.of(data).map(R.props(['ssn', 'firstname', 'lastname', 'grade']))
                        .map(populateRow).map(appendToTable('studentRoster'));
                    unsafeIO.run();
                });
        }))
    .catch(function(error) {
        alert('Erro occurred: ' + error.message);
    });


var write = function(id) {
    return (function(value) {
        $('#' + id).text(value)
    });
};

var average = R.compose(Math.ceil, forkJoin(R.divide, R.sum, R.length));

//// 2
//getJSON(HOST + '/students')
//    .then(hide('spinner'))
//    .then(R.map((student) => HOST + '/grades?ssn=' + student.ssn))
//    .then(function (gradeUrls) {
//        return Promise.all(R.map(getJSON, gradeUrls))
//    })
//    .then(R.map(average))
//    .then(average)
//    .then(function (grade) {
//        IO.of(grade).map(write('total')).run();
//    })
//    .catch(function(error) {
//        alert('Error occurred: ' + error.message);
//    });