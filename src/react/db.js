
const DB_NAME = 'students';

var openDB = function() {
    const version = 2;
    return new Promise(function(resolve, reject) {
        //Opening the DB
        var request = indexedDB.open("studentData", version);
        var db;

        //Handling onupgradeneeded
        //Will be called if the database is new or the version is modified
        request.onupgradeneeded = function(e) {
            db = e.target.result;
            e.target.transaction.onerror = indexedDB.onerror;

            //Deleting DB if already exists
            if(db.objectStoreNames.contains(DB_NAME)) {
                db.deleteObjectStore(DB_NAME);
            }
            //Creating a new DB store with a paecified key property
            var store = db.createObjectStore("students", {keyPath: "ssn", autoIncrement: true});
        };

        //If opening DB succeeds
        request.onsuccess = function(e) {
            db = e.target.result;
            resolve(db);
        };

        //If DB couldn't be opened for some reason
        request.onerror = function(e) {
            reject(Error("Couldn't open DB"));
        };
    });
};

var find = function (db, studentId) {
    const trans = db.transaction(['students'], 'readonly');
    const store = trans.objectStore('students');
    return new Promise(function(resolve, reject) {
        var request = store.get(studentId);

        request.onerror = function() {
            reject(new Error('Student not found!'));
        };
        request.onsuccess = function() {
            resolve(request.result);
        };
    });
};

var getAllStudents = function(db) {
    var studentArr = [];

    //Creating a transaction object to perform Read/Write operations
    var trans = db.transaction([DB_NAME], "readwrite");

    //Getting a reference of the todo store
    var store = trans.objectStore(DB_NAME);

    //Wrapping all the logic inside a promise
    return new Promise(function(resolve, reject) {
        //Opening a cursor to fetch items from lower bound in the DB
        //var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = store.openCursor();

        //success callback
        cursorRequest.onsuccess = function(e) {
            var result = e.target.result;

            //Resolving the promise with todo items when the result id empty
            if(result === null || result === undefined) {

                resolve({
                    'db': db,
                    'data': studentArr
                });
            }
            //Pushing result into the todo list
            else{
                studentArr.push(result.value);
                result.continue();
            }
        };

        //Error callback
        cursorRequest.onerror = function(e){
            reject("Couldn't fetch items from the DB");
        };
    });
};

var addStudent = function(db, firstname, lastname, ssn) {
    //Creating a transaction object to perform read-write operations
    var trans = db.transaction([DB_NAME], "readwrite");
    var store = trans.objectStore(DB_NAME);

    //Wrapping logic inside a promise
    return new Promise(function(resolve, reject){
        //Sending a request to add an item
        var request = store.add({
            ssn: ssn, firstname: firstname, lastname: lastname
        });

        //success callback
        request.onsuccess = function(e) {
            resolve(db);
        };

        //error callback
        request.onerror = function(e) {
            console.log(e.value);
            reject("Couldn't add the passed item");
        };
    });
};


var addStudents = function(db, arr) {
    //Creating a transaction object to perform read-write operations
    var trans = db.transaction([DB_NAME], "readwrite");
    var store = trans.objectStore(DB_NAME);

    //Wrapping logic inside a promise
    return new Promise(function(resolve, reject){
        for(let i in arr) {
            //Sending a request to add an item
            var request = store.add(arr[i]);

            //success callback
            request.onsuccess = function(e) {
                // continue
                console.log('Added student: ' + arr[i].ssn);
            };

            //error callback
            request.onerror = function(e) {
                console.log(e.value);
                reject("Couldn't add the passed item");
            };
        }
        resolve(db);
    });
};

var deleteStudent = function(db, id) {
    return new Promise(function(resolve, reject){
        var trans = db.transaction([DB_NAME], "readwrite");
        var store = trans.objectStore(DB_NAME);
        var request = store.delete(id);

        request.onsuccess = function(e) {
            resolve(true);
        };

        request.onerror = function(e) {
            console.log(e);
            reject("Couldn't delete the item");
        };
    });
};