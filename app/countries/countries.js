viewsModule
  .config(function($routeProvider) {
    $routeProvider.when('/countries', {
      templateUrl : 'countries/countries.html',
      controller : 'CountriesCtrl'
    });
  })

  .controller('CountriesCtrl', function($scope, $location, ccCountries) {
    $scope.pageClass = 'page-countries';
    $scope.errorMsg = '';

    ccCountries()
      .success(function(result) {
        debug("Geonames API Success");
        $scope.results = result;
      })
      .error(function() {
        debug('Geonames API errorMsg');
        $scope.errorMsg = "Error: the call to the server has FAILED!";
      });

    //Call home route when button clicked
    $scope.goHome = function (path) {
      $location.path(path);
    };
  });
