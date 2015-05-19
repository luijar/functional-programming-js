/**
 * Main Application File
 */
var app = angular.module('StudentAdminConsole', []);

app.controller('StudentCreateCtrl', function ($scope, $http) {
    $scope.saveStudent = function() {
        log("Saving student....");
        alert('posting' + JSON.stringify($scope.form));



    };
});

require(['lodash'], function(_) {




});