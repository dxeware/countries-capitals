angular.module('ccApp', ['ngRoute', 'ngAnimate', 'ccLibrary', 'ccAppViews'])

  .config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/countries', {
      templateUrl : 'countries/countries.html',
      controller : 'CountriesCtrl'
    })
    .when('/error', {
      templateUrl : 'home/home.html',
     })
    .otherwise('/error');
  }])

  .controller('CountriesCtrl', function($scope, $location, ccCountries) {
    $scope.pageClass = 'page-countries';

    ccCountries()
      .success(function(result) {
        debug("Geonames API Success");
        $scope.results = result;
      })
      .error(function() {
        debug('Geonames API errorMsg');
        //$scope.errorMsg = "Error: the call to the server has FAILED!";
      });
  });
