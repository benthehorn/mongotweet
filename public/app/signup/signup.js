'use strict';

angular.module('myApp.signup', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/signup', {
        templateUrl: 'signup/signup.html',
        controller: 'SignUpCtrl'
      });
    }])

    .controller('SignUpCtrl', function ($http, $scope) {
      $scope.addUser = function (newUser) {
        console.log('User :' , newUser);
        $http.post('users/signup', newUser)

            .then(function (data) {
              console.log('User added :' + data);
            }, function (err) {

              console.log('Error : ' + err.message);
            });
      };

    });
