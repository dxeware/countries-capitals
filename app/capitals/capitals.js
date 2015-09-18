viewsModule
  .config(function($routeProvider) {
    $routeProvider.when('/countries/:country/capital', {
      templateUrl : 'capitals/capitals.html',
      controller : 'CapitalsCtrl'
    });
  })

  .controller('CapitalsCtrl', function($scope, $location, $routeParams, ccCountries, ccCapitals, ccNeighbours) {
    $scope.pageClass = 'page-capitals';
    $scope.errPresent = false;
    $scope.errorMsg = '';
    $scope.dataReady = false;
    $scope.thisCountryInfo = {};
    $scope.capitalInfo = {};
    $scope.neighbours = {};
    var countryInfo = {};
    //$scope.country = $routeParams.country;

    ccCountries().then(
      function(result) {
        // Check if an error message is present,
        // otherwise find country in array and save
        if ( result.status ) {
          $scope.errorMsg = "Error: " + result.status.message + " [Error code: " + result.status.value + "]";
          $scope.errPresent = true;
        } else {
          countryInfo = result;

          // Search array for matching country
          for (var i = 0; i < countryInfo.geonames.length; i++) {
            if ( countryInfo.geonames[i].countryCode === $routeParams.country ) {
              $scope.thisCountryInfo = countryInfo.geonames[i];
            }
          }

          ccCapitals($scope.thisCountryInfo.capital, $routeParams.country).then(
            function(result) {
              // Check if an error message is present,
              // otherwise display results
              if ( result.status ) {
                $scope.errorMsg = "Error: " + result.status.message + " [Error code: " + result.status.value + "]";
                $scope.errPresent = true;
              } else {
                if ( result.geonames.length === 0 ) {
                  //$scope.errorMsg = "Error: No matching capital was found!";
                  //$scope.errPresent = true;
                  $scope.dataReady = true;
                } else {
                  $scope.capitalInfo = result.geonames[0];
                  $scope.dataReady = true;
                }
              }
            }
          ).catch(serverError); // then ccCapitals


          ccNeighbours($scope.thisCountryInfo.geonameId).then(
            function(result) {
              $scope.neighbours.errMsg = ''; //clear err message
              // Check if an error message is present,
              // otherwise display results
              if ( result.status ) {
                // If error received, display error message
                $scope.neighbours.errMsg = "Server returned error - no neighbours returned!";
              } else {
                $scope.neighbours = result;
              }
            }

          ); // then ccNeighbours
        } //ccCountries else
      } //ccCountries

    ).catch(serverError); //then ccCountries

    function serverError() {
        debug("CATCH Error: the call to the server has FAILED!");
        $scope.errorMsg = "CATCH Error: the call to the server has FAILED!";
        $scope.errPresent = true;
    }

    //Call route when button clicked
    $scope.go = function (path) {
      $location.path(path);
    };

  });
