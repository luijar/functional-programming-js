
var store = Store('students');
var tableId = 'studentRoster';

function addToRoster(studentId) {

    studentId = studentId.replace(/^\s*|\-|\s*$/g, '');
    if(studentId.length !== 9) {
        throw new Error('Invalid Input');
    }

    var student = store.get(studentId);

    if (student !== null) {
        var rowInfo = [
            '<td>' + student.ssn + '</td>',
            '<td>' + student.firstname + '</td>',
            '<td>' + student.lastname + '</td>'
        ];

        $('#' + tableId + ' tr:last').after(
            '<tr>' + rowInfo + '</tr>');

        return $('#' + tableId + ' tr').length - 1;
    }
    else {
        throw new Exception('Student not found!');
    }
}


