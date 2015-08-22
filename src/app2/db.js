var lastIndex = 0;
var db;
var open = function() {
    const version = 2;
    var promise = new Promise(function(resolve, reject) {
        //Opening the DB
        var request = indexedDB.open("studentData", version);

        //Handling onupgradeneeded
        //Will be called if the database is new or the version is modified
        request.onupgradeneeded = function(e) {
            db = e.target.result;
            e.target.transaction.onerror = indexedDB.onerror;

            //Deleting DB if already exists
            if(db.objectStoreNames.contains("students")) {
                db.deleteObjectStore("students");
            }
            //Creating a new DB store with a paecified key property
            var store = db.createObjectStore("students", {keyPath: "ssn", autoIncrement: true});
        };

        //If opening DB succeeds
        request.onsuccess = function(e) {
            db = e.target.result;
            resolve();
        };

        //If DB couldn't be opened for some reason
        request.onerror = function(e) {
            reject("Couldn't open DB");
        };
    });
    return promise;
};

var getAllStudents = function() {
    var studentArr = [];

    //Creating a transaction object to perform Read/Write operations
    var trans = db.transaction(["students"], "readwrite");

    //Getting a reference of the todo store
    var store = trans.objectStore("students");

    //Wrapping all the logic inside a promise
    var promise = new Promise(function(resolve, reject){
        //Opening a cursor to fetch items from lower bound in the DB
        //var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = store.openCursor();

        //success callback
        cursorRequest.onsuccess = function(e) {
            var result = e.target.result;

            //Resolving the promise with todo items when the result id empty
            if(result === null || result === undefined){
                resolve(studentArr);
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
    return promise;
};

var addStudent = function(name, ssn) {
    //Creating a transaction object to perform read-write operations
    var trans = db.transaction(["students"], "readwrite");
    var store = trans.objectStore("students");

    //Wrapping logic inside a promise
    var promise = new Promise(function(resolve, reject){
        //Sending a request to add an item
        var request = store.add({
            ssn: ssn, name: name
        });

        //success callback
        request.onsuccess = function(e) {
            resolve();
        };

        //error callback
        request.onerror = function(e) {
            console.log(e.value);
            reject("Couldn't add the passed item");
        };
    });
    return promise;
};

var deleteStudent = function(id) {
    var promise = new Promise(function(resolve, reject){
        var trans = db.transaction(["students"], "readwrite");
        var store = trans.objectStore("students");
        var request = store.delete(id);

        request.onsuccess = function(e) {
            resolve();
        };

        request.onerror = function(e) {
            console.log(e);
            reject("Couldn't delete the item");
        };
    });
    return promise;
};