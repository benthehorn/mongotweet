'use strict';

/* Factories */

angular.module('myApp.factories', []).
    factory('InfoFactory', function () {
      var info = 'Hello World from a Factory';
      var getInfo = function getInfo() {
        return info;
      };

      return {
        getInfo: getInfo
      };
    })
.factory('authInterceptor', function ($rootScope, $q, $window) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          if ($window.sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
          }

          return config;
        },

        responseError: function (rejection) {
          if (rejection.status === 401) {
            // handle the case where the user is not authenticated
          }

          return $q.reject(rejection);
        }
      };
    })
    .factory('api', function ($http) {
      function numberOfUsers() {
        return $http.get('/social/numberOfUsers');
      }

      function getUserNamesMentioned() {
        return $http.get('/social/userNamesMentioned');
      }

      function getPositiveTweeters() {
        return $http.get('/social/positiveTweets');
      }

      function getNegativeTweeters() {
        return $http.get('/social/negativeTweets');
      }

      function getMostMentioned() {
        return $http.get('/social/mostMentionedUsers');
      }

      return {
        numberOfUsers: numberOfUsers,
        getUserNamesMentioned: getUserNamesMentioned,
        getPositiveTweeters: getPositiveTweeters,
        getNegativeTweeters: getNegativeTweeters,
        getMostMentioned: getMostMentioned
      };
    });

