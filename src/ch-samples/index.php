<?php
// Simple script that returns student information
// Chapter 8
// Luis Atencio

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if (preg_match('/\.(?:png|jpg|jpeg|gif)$/', $_SERVER["REQUEST_URI"])) {
    return false;    // serve the requested resource as-is.
}
else {
    $data = [];
    if($_SERVER["REQUEST_URI"] == '/students') {
        $s1 = new Student('Haskell', 'Curry', '444-44-4444');
        $s1->address = new Address('US');

        $s2 = new Student('Alan', 'Turing', '555-55-5555');
        $s2->address = new Address('England');

        $s3 = new Student('Alonzo', 'Church', '666-66-6666');
        $s3->address = new Address('US');

        $data[] = $s1;
        $data[] = $s2;
        $data[] = $s3;
    }
    else {
        switch($_GET["ssn"]) {
           case "444-44-4444":
                $g1 = [80, 90, 100];
                $data = $g1;
            break;
            case "555-55-5555":
                $g1 = [90, 91, 89];
                $data = $g1;
            break;
            case "666-66-6666":
                $g1 = [95, 79, 89];
                $data = $g1;
            break;
        }
    }
    echo json_encode($data);
}

class Student {
    public $firstname;
    public $lastname;
    public $ssn;
    public $address;

    function __construct($firstname, $lastname, $ssn) {
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->ssn = $ssn;
    }
}

class Address {
    public $country;

    function __construct($country = 'US') {
        $this->country = $country;
    }
}
?>