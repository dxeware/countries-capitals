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
    $scope.errPresent = false;
    $scope.dataReady = false;
    $scope.loading = true;

    ccCountries().then(
      function(result) {
        //clear the Spinner animation
        $scope.loading = false;

        // Check if an error message is present,
        // otherwise display results
        if ( result.status ) {
          $scope.errorMsg = "Error: " + result.status.message + " [Error code: " + result.status.value + "]";
          $scope.errPresent = true;
        } else {
          $scope.results = result;
          $scope.dataReady = true;
        }
      },
      function() {
        $scope.errorMsg = "Error: the call to the server has FAILED!";
        $scope.errPresent = true;
      }
    );

    //Call route when button clicked
    $scope.go = function (path) {
      $location.path(path);
    };

  });
