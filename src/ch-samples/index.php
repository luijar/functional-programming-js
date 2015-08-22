<?php
// Simple script that returns student information
// Chapter 8
// Luis Atencio


if (preg_match('/\.(?:png|jpg|jpeg|gif)$/', $_SERVER["REQUEST_URI"])) {
    return false;    // serve the requested resource as-is.
}
else {
    $data = [];
    if($_SERVER["REQUEST_URI"] == '/students') {
        $s1 = new Student('Haskell', 'Curry', '444-44-4444');
        $s2 = new Student('Haskell', 'Curry', '444-44-4444');
        $data[] = $s1;
        $data[] = $s2;
    }
    else {
        $g1 = [80, 90, 100];
        $data[] = $g1;
    }
    throw new Exception('sd');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    echo json_encode($data);
}

class Student {
    public $firstname;
    public $lastname;
    public $ssn;

    function __construct($firstname, $lastname, $ssn) {
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->ssn = $ssn;
    }
}
?>