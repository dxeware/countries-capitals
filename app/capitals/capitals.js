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
                  //$scope.dataReady = true;
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

/*
    var CapitalDetails = function( ccCountries, ccCapitals, ccNeighbours ) {
      var getCountries = function() {
        return ccCountries()                        // Request #1
                .then( function( countriesResult ) {
                        // Check if an error message is present,
                        // otherwise find country in array and save
                        if ( countriesResult.status ) {
                          $scope.errorMsg = "Error: " + countriesResult.status.message + " [Error code: " + countriesResult.status.value + "]";
                          $scope.errPresent = true;
                          throw new Error('this is an error');
                        } else {
                          countryInfo = countriesResult;

                          // Search array for matching country
                          for (var i = 0; i < countryInfo.geonames.length; i++) {
                            if ( countryInfo.geonames[i].countryCode === $routeParams.country ) {
                              $scope.thisCountryInfo = countryInfo.geonames[i];
                              return $scope.thisCountryInfo;
                            }
                          }

                        }
                          return $scope.thisCountryInfo;         // Response Handler #1
                      },
                      function() {
                        $scope.errorMsg = "Error: the call to the server has FAILED!";
                        $scope.errPresent = true;
                      }
                ); // then
      },
      getCapitals = function( capitalName, countryCode) {
        return ccCapitals( capitalName, countryCode )                // Request #2
                .then( function( capitalsResult ) {
                        // Check if an error message is present,
                        // otherwise display results
                        if ( capitalsResult.status ) {
                          $scope.errorMsg = "Error: " + capitalsResult.status.message + " [Error code: " + capitalsResult.status.value + "]";
                          $scope.errPresent = true;
                          throw new Error('this is an error');
                        } else {
                          if ( capitalsResult.geonames.length === 0 ) {
                            $scope.errorMsg = "Error: No matching capital was found!";
                            $scope.errPresent = true;
                            throw new Error('this is an error');
                          } else {
                            $scope.capitalInfo = capitalsResult.geonames[0];
                            return $scope.capitalInfo;
                          }
                        }
                      },
                      function() {
                        $scope.errorMsg = "Error: the call to the server has FAILED!";
                        $scope.errPresent = true;
                      }
                ); // then
      },
      getNeighbours = function( geonameId ) {
        return ccNeighbours( geonameId )             // Request #3
                .then( function( neighboursResult )
                {
                    $scope.neighbours = neighboursResult;       // Response Handler #3
                    //return weather;
                });
      };

      //debug("$scope = " + $scope);

      getCountries()
        .then( getCapitals( $scope.thisCountryInfo.capital, $routeParams.country ))
          .then( getNeighbours( $scope.thisCountryInfo.geonameId ) );

      $scope.dataReady = true;

    };

    CapitalDetails( ccCountries, ccCapitals, ccNeighbours );
    debug("$scope = " + $scope);
*/
    //Call home route when "Home" button clicked
    $scope.goHome = function (path) {
      $location.path(path);
    };

    //Call countries route when "Browse Countries" button clicked
    $scope.goCountries = function (path) {
      $location.path(path);
    };




  });
