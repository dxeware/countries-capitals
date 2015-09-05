angular.module('ccApp', ['ngRoute', 'ngAnimate', 'ccLibrary'])

  .config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl : 'home/home.html',
      controller : 'HomeCtrl'
    })
    .when('/countries', {
      templateUrl : 'countries/countries.html',
      controller : 'CountriesCtrl'
    })
    .when('/error', {
      templateUrl : 'home/home.html',
     })
    .otherwise('/error');
  }])
  .controller('HomeCtrl', function($scope, $location) {
    $scope.pageClass = 'page-home';

    //Call countries route when button clicked
    $scope.goCountries = function (path) {
      $location.path(path);
    };

  })

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
