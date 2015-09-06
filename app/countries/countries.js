viewsModule
  .config(function($routeProvider) {
    $routeProvider.when('/countries', {
      templateUrl : 'countries/countries.html',
      controller : 'CountriesCtrl'
    });
  })

  .controller('CountriesCtrl', function($scope, $location, ccCountries) {
    $scope.pageClass = 'page-countries';
    $scope.results = {};
    $scope.errorMsg = '';

    ccCountries.getData().then(
      function(result) {
        // Check if an error message is present,
        // otherwise display results
        if ( result.status.message ) {
          $scope.errorMsg = "Error: " + result.status.message;
        } else {
          $scope.results = result;
        }
      },
      function() {
        $scope.errorMsg = "Error: the call to the server has FAILED!";
      });

    //Call home route when button clicked
    $scope.goHome = function (path) {
      $location.path(path);
    };
  });
