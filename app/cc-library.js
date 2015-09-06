var DEBUG_MODE = true;
var debug = function(msg) {
  if (DEBUG_MODE === true) {
      console.log("DEBUG:", msg);
  }
};

angular.module('ccLibrary', [])

  .constant('CC_COUNTRY_INFO', 'http://api.geonames.org/countryInfoJSON?username=dxeware')

  .factory('ccCountries', function($q, $http, CC_COUNTRY_INFO) {
    return {
      getData: function() {
        var deferred = $q.defer();
        $http({
          cache : true,
          method: 'GET',
          url: CC_COUNTRY_INFO
        })
        .success(function(result) {
          debug("Geonames API Success");
          deferred.resolve(result);
        })
        .error(function(result) {
          debug('Geonames API errorMsg');
          deferred.reject(result);
        });
        return deferred.promise;
      }
    };
  });
