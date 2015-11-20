
var store = DB('students');
var elementId = 'student-info';

function showStudent(ssn) {
    if (ssn != null) {
        ssn = ssn.replace(/^\s*|\-|\s*$/g, '');

        if (ssn.length !== 9) {
            throw new Error('Invalid input');
        }

        var student = store.get(ssn);

        if (student) {
            var info = `${student.ssn}, ${student.firstname}, ${student.lastname}`;

            document.querySelector('#' + elementId).innerHTML = info;

            return info;
        }
        else {
            throw new Error('Student not found!');
        }
    }
    else {
        return null;
    }
}


