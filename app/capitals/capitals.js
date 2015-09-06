viewsModule
  .config(function($routeProvider) {
    $routeProvider.when('/countries/:country/capital', {
      templateUrl : 'capitals/capitals.html',
      controller : 'CapitalsCtrl'
    });
  })

  .controller('CapitalsCtrl', function($scope, $location, $routeParams) {
    $scope.pageClass = 'page-capitals';
    $scope.country = '';

    $scope.country = $routeParams.country;

/*
    ccCountries.getData().then(
      function(result) {
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
      });
*/
  });
