const HOST = 'http://localhost:8000';

var getJSON = function (url, resolve, reject) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url);
    req.onload = function() {
        if(req.status == 200) {
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
};

var addStudentToRoster = function (student, grade) {
    $('#studentRoster tr:last').after("<tr><td>" + student.ssn + "</td>" +
        "<td>" + student.firstname + "</td>" +
        "<td>" + student.lastname + "</td>" +
        "<td>" +  grade + "</td>" +
        "</tr>");
};

function average(grades) {
    return Math.ceil(grades.reduce(function (total, current) { return total + current; }, 0)
        / grades.length);

}

getJSON(HOST + '/students', function(students) {  // #A
        $('#spinner').hide();
        students.sort(function(a, b){
            if(a.ssn < b.ssn) return -1;
            if(a.ssn > b.ssn) return 1;
            return 0;
        });
        for(let i = 0; i < students.length; i++) {
            var student = students[i];
            if(student.address.country === 'US') {
                getJSON(HOST + '/grades?ssn=' + student.ssn,  // #B
                    function (grades) {
                        addStudentToRoster(student, average(grades)); // #C
                    },
                    function (error) { // #B
                        alert('Inside grades' + error);
                    });
            }
        }
    }, function (error) { // #A
        alert(error);
    }
);