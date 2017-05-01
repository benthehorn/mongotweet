'use strict';

angular.module('myApp',[
    'toastr',
    'ngRoute',
    'ngAnimate',
    'angular-jwt',
    'ui.bootstrap',
    'myApp.signup',
    'myApp.security',
    'myApp.controllers',
    'myApp.directives',
    'myApp.services',
    'myApp.factories',
    'myApp.filters',
    'myApp.view1',
     'myApp.view2',
     'angular-loading-bar',

]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}]).
config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});