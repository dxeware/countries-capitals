viewsModule
  .config(function($routeProvider) {
    $routeProvider.when('/countries/:country/capital', {
      templateUrl : 'capitals/capitals.html',
      controller : 'CapitalsCtrl'
    });
  })

  .controller('CapitalsCtrl', function($scope, $location, $routeParams, ccCountries, ccCapitals, ccNeighbours) {
    $scope.pageClass = 'page-capitals';
    $scope.country = '';
    $scope.errPresent = false;
    $scope.errorMsg = '';
    $scope.dataReady = false;
    $scope.thisCountryInfo = {};
    $scope.capitalInfo = {};
    $scope.neighbours = {};
    var countryInfo = {};

    $scope.country = $routeParams.country;

    ccCountries().then(
      function(result) {
        // Check if an error message is present,
        // otherwise find country in array and save
        if ( result.status ) {
          $scope.errorMsg = "Error: " + result.status.message + " [Error code: " + result.status.value + "]";
          $scope.errPresent = true;
        } else {
          countryInfo = result;
          //$scope.dataReady = true;

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
                  $scope.errorMsg = "Error: No matching capital was found!";
                  $scope.errPresent = true;
                } else {
                  $scope.capitalInfo = result.geonames[0];

                  ccNeighbours($scope.thisCountryInfo.geonameId).then(
                    function(result) {
                      // Check if an error message is present,
                      // otherwise display results
                      if ( result.status ) {
                        $scope.errorMsg = "Error: " + result.status.message + " [Error code: " + result.status.value + "]";
                        $scope.errPresent = true;
                      } else {
                        //if ( result.geonames.length === 0 ) {
                          //$scope.errorMsg = "Error: No matching capital was found!";
                          //$scope.errPresent = true;
                        //} else {
                          $scope.neighbours = result;


                          $scope.dataReady = true;
                          //displayCapitalInfo();
                        //}
                      }
                    },
                    function() {
                      $scope.errorMsg = "Error: the call to the server has FAILED!";
                      $scope.errPresent = true;
                    }
                  );
                  $scope.dataReady = true;
                  //displayCapitalInfo();
                }
              }
            },
            function() {
              $scope.errorMsg = "Error: the call to the server has FAILED!";
              $scope.errPresent = true;
            }
          );
        }
      },
      function() {
        $scope.errorMsg = "Error: the call to the server has FAILED!";
        $scope.errPresent = true;
      }
    );

    function displayCapitalInfo() {
      /* country name,
      population of country,
      area,
      capital,
      population of capital,
      continent,
      timezone and
      number and names of neighbors.
      */
    };

    //Call home route when "Home" button clicked
    $scope.goHome = function (path) {
      $location.path(path);
    };

    //Call countries route when "Browse Countries" button clicked
    $scope.goCountries = function (path) {
      $location.path(path);
    };

  });
