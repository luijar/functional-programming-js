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

var average = (grades) => { /*alert(grades);*/ return Math.ceil(grades.reduce(function (acc, val) { return acc + val; }, 0) / grades.length)};
var hide = (id) => $('#' + id).hide();

var addStudentToRoster = function (student, grade) {
    $('#studentRoster tr:last').after("<tr><td>" + student.ssn + "</td>" +
        "<td>" + student.firstname + "</td>" +
        "<td>" + student.lastname + "</td>" +
        "<td>" +  grade + "</td>" +
        "</tr>");
};

getJSON(HOST + '/students')
    .then(hide('spinner'))
    .then(R.sortBy(R.prop('ssn')))
    .then(R.filter((s) => s.address.country == 'US'))
    .then(R.map(function (student) {
            getJSON(HOST + '/grades?ssn=' + student.ssn)
                .then(average)
                .then(function (grade) {
                    addStudentToRoster(student, grade);
                });
        }))
    .catch(function(error) {
        alert('Erro occurred: ' + error.message);
    }
);