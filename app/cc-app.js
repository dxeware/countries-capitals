angular.module('ccApp', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl : 'home/home.html',
      controller : 'HomeCtrl'
    });
}])
.controller('HomeCtrl', function($scope, $location) {
  $scope.pageClass = 'page-home';

});
