angular.module('ccApp', ['ngRoute', 'ngAnimate', 'ccLibrary', 'ccAppViews'])

  .config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/error', {
      templateUrl : 'home/home.html',
      controller : 'HomeCtrl'
     })
    .otherwise('/error');
  }]);


