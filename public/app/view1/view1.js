'use strict';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/view1', {
        templateUrl: 'app/view1/view1.html',
        controller: 'View1Ctrl'
      });
    }])

.controller('View1Ctrl', function ($http, $scope) {
  var numberOfUsers = 0;
  var usersMentioned = {};
  $scope.loading = true;
  $http.get('/social/numberOfUsers')
    .then(function (data) {
      numberOfUsers = data.data.numberOfUsers;
      $scope.numberOfUsers = numberOfUsers;
    }, function (err) {

      console.log('Error : ' + err);
    });

  $http.get('/social/userNamesMentioned')
    .then(function (data) {
      usersMentioned = data;
      $scope.usersMentioned = usersMentioned;
    }, function (err) {

      console.log('Error : ' + err);
    }).finally(function () {
    $scope.loading = false;
  });
});
