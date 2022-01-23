'use strict';

angular.module('testApp', ['ui.bootstrap','ngRoute','ui.grid'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
      })
      .when('/lenders', {
        templateUrl: 'pages/lenders.html',
        controller: 'lendersMaintenanceCtrl'
      })
      .when('/lenders2', {
        templateUrl: 'pages/lenders2.html',
        controller: 'lendersMaintenanceCtrl2'
      })
      .otherwise({
        redirectTo: '/'
      });
      //$locationProvider.html5Mode(true);
    
  });
