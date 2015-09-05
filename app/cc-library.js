var DEBUG_MODE = true;
var debug = function(msg) {
  if (DEBUG_MODE === true) {
      console.log("DEBUG:", msg);
  }
};

angular.module('ccLibrary', [])

  .constant('CC_COUNTRY_INFO', 'http://api.geonames.org/countryInfoJSON?username=dxeware')

  .factory('ccCountries', function($http, CC_COUNTRY_INFO) {
    return function() {
      return $http({
        cache : true,
        method: 'GET',
        url: CC_COUNTRY_INFO
      });
    };
  });
