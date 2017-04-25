'use strict';

angular.module('myApp.controllers', []).
    controller('AppCtrl', function ($scope, $http, $window, $location) {

  function urlBase64Decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  }


  $scope.username = '';
  $scope.isAuthenticated = false;
  $scope.isAdmin = false;
  $scope.isUser = false;
  $scope.message = '';
  $scope.error = null;

  $scope.submit = function () {
    $http
        .post('/authenticate', $scope.user)
        .success(function (data, status, headers, config) {
          $window.sessionStorage.token = data.token;
          $scope.isAuthenticated = true;
          var encodedProfile = data.token.split('.')[1];
          var profile = JSON.parse(urlBase64Decode(encodedProfile));
          $scope.username = profile.username;
          $scope.isAdmin = profile.role == 'admin';
          $scope.isUser = !$scope.isAdmin;
          $scope.error = null;
        })
        .error(function (data, status, headers, config) {
          // Erase the token if the user fails to log in
          delete $window.sessionStorage.token;
          $scope.isAuthenticated = false;

          $scope.error = 'You failed to login. Invalid User or Password';
        });
  };

  $scope.logout = function () {
    $scope.isAuthenticated = false;
    $scope.isAdmin = false;
    $scope.isUser = false;
    delete $window.sessionStorage.token;
    $location.path('/view1');
  };
});
