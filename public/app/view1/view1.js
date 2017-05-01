'use strict';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/view1', {
        templateUrl: 'app/view1/view1.html',
        controller: 'View1Ctrl'
      });
    }])

.controller('View1Ctrl', function ($http, $scope, api) {
  var numberOfUsers = 0;
  var usersMentioned = {};
  var positiveNegativeTweeters = [];
  var negativeTweeters = [];
  var mostMentioned = [];
  $scope.loading = true;
  $scope.getNumberOfUsers = function () {

      api.numberOfUsers()
          .then(function (data) {
            numberOfUsers = data.data.numberOfUsers;
            $scope.numberOfUsers = numberOfUsers;
          }, function (err) {

              console.log('Error: ' + err);
            });
    };

  $scope.getUserNamesMentioned = function () {

      api.getUserNamesMentioned()
          .then(function (data) {
              usersMentioned = data;
              $scope.usersMentioned = usersMentioned;
            }, function (err) {

              console.log('Error : ' + err);
            })
          .finally(function () {
          $scope.loading = false;
        });
    };

  $scope.getPositiveTweeters = function () {

      api.getPositiveTweeters()
          .then(function (data) {
              positiveNegativeTweeters = data.data;
              $scope.positiveNegativeTweeters = positiveNegativeTweeters;
              $scope.element = 'Positive';
            }, function (err) {

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

              console.log('Error : ' + err);
            });
    };

  $scope.getMostMentioned = function () {

    api.getMostMentioned()
      .then(function (data) {
        console.log(data);
        mostMentioned = data.data;
        $scope.mostMentioned = mostMentioned;
      }, function (err) {

        console.log('Error : ', err);
      });
  };
});
