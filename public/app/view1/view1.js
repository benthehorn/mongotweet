'use strict';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/view1', {
        templateUrl: 'app/view1/view1.html',
        controller: 'View1Ctrl'
      });
    }])

.controller('View1Ctrl', function ($http, $scope, api, toastr) {
  var numberOfUsers = 0;
  var usersMentioned = {};
  var positiveNegativeTweeters = [];
  var negativeTweeters = [];
  var mostMentioned = [];

  $scope.getNumberOfUsers = function () {
    api.numberOfUsers()
          .then(function (data) {
            numberOfUsers = data.data.numberOfUsers;
            $scope.numberOfUsers = numberOfUsers;
          }, function (err) {
            toastr.error('Something went wrong!!', 'Error');
              console.log('Error: ' + err);
            });
    };

  $scope.getUserNamesMentioned = function () {
      api.getUserNamesMentioned()
          .then(function (data) {
              usersMentioned = data;
              $scope.usersMentioned = usersMentioned;
            }, function (err) {
            toastr.error('Something went wrong!!', 'Error');
              console.log('Error : ' + err);
            });
    };

  $scope.getPositiveTweeters = function () {

      api.getPositiveTweeters()
          .then(function (data) {
              positiveNegativeTweeters = data.data;
              $scope.positiveNegativeTweeters = positiveNegativeTweeters;
              $scope.element = 'Positive';
            }, function (err) {
            toastr.error('Something went wrong!!', 'Error');
              console.log('Error : ' + err);
            });
    };

  $scope.getNegativeTweeters = function () {
      api.getNegativeTweeters()
          .then(function (data) {
              positiveNegativeTweeters = data.data;
              $scope.positiveNegativeTweeters = positiveNegativeTweeters;
              $scope.element = 'Negative';
            }, function (err) {
            toastr.error('Something went wrong!!', 'Error');
              console.log('Error : ' + err);
            });
    };

  $scope.getMostTweeters = function () {
      api.getMostTweeters()
          .then(function (data) {
              positiveNegativeTweeters = data.data;
              $scope.positiveNegativeTweeters = positiveNegativeTweeters;
              $scope.element = 'Top 10 active';
            }, function (err) {
            toastr.error('Something went wrong!!', 'Error');
              console.log('Error : ' + err);
            });
    };

  $scope.getMostMentioned = function () {
    api.getMostMentioned()
      .then(function (data) {
        mostMentioned = data.data;
        $scope.mostMentioned = mostMentioned;
      }, function (err) {
        toastr.error('Something went wrong!!', 'Error');
        console.log('Error : ', err);
      });
  };
});
