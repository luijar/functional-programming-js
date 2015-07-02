/**
 * DB
 */



const NAME = 'StudentsDB';
const VERSION = 2;
const OBJ_STORE = 'students';
const seedData = [
    { ssn: "444-44-4444", firstname: "Alonzo",  lastname: 'Church'},
    { ssn: "555-55-5555", firstname: "Stephen", lastname: 'Kleene'}
];

var request = indexedDB.open(NAME, VERSION);
var db;
request.onupgradeneeded = function (event) {
    db = event.target.result;
    log('Deleting database');
    //indexedDB.deleteDatabase(NAME);

    log('Upgrading schema to DB version: ' + db.version);
    var objStore = db.createObjectStore(OBJ_STORE, { autoIncrement : true });
    objStore.createIndex("ssn", "ssn", { unique: true });

    log('Seeding database');
    //var objStore = db.transaction(["students"], "readwrite").objectStore("students");
    seedData.forEach(function (data) {
        objStore.add(data);
    });
};
request.onsuccess = function(event) {
    db = event.target.result;
    log('Request success');
};
request.onerror = function(event) {
    log("Error opening database StudentDB");
};

function fetchStudent(ssn, callback) {
    var transaction = db.transaction([OBJ_STORE]);
    var objectStore = transaction.objectStore(OBJ_STORE);
    var request = objectStore.get(ssn);
    request.onerror = function(event) {
        log('Error fetching student by SSN: '  + ssn);
    };
    request.onsuccess = function(event) {
        // Do something with the request.result!
        alert("Name " + request.result.firstname);
    };
}

// Fetch Student after DB has been set up
var int = setInterval(function() {
    saveStudent(normalizeObj(new Student('Luis', 'Atencio', 'Princeton', '666-66-6666')));
}, 2000);

function saveStudent(student) {

    var transaction = db.transaction([OBJ_STORE], 'readwrite');
    var objectStore = transaction.objectStore(OBJ_STORE);
    var request = objectStore.add(student);
    request.onerror = function(event) {
        log('Student save error' + this.error);
    };
    request.onsuccess = function(event) {
        log('Student saved sucessfully');
    };
    clearInterval(int);
}

function normalizeObj(student) {
    delete student.friends;
    delete student.address;
    return JSON.parse(JSON.stringify(student));

    //return {ssn:student.getSsn(), firstname:student.getFirstname(), lastname: student.getLastName()};
    //return student;
}




