var DEBUG_MODE = true;
var debug = function(msg) {
  if (DEBUG_MODE === true) {
      console.log("DEBUG:", msg);
  }
};

angular.module('ccLibrary', [])

  .constant('CC_USERNAME', 'username=dxeware')
  .constant('CC_COUNTRY_INFO', 'http://api.geonames.org/countryInfoJSON?')
  .constant('CC_SEARCH_PREFIX', 'http://api.geonames.org/searchJSON?')
  .constant('CC_Q', 'q=')
  .constant('CC_COUNTRY', 'country=')
  .constant('CC_NAME_EQUALS', 'name_equals=')
  .constant('CC_FCODE', 'featureCode=PPLC')
  .constant('CC_NEIGHBORS_PREFIX', 'http://api.geonames.org/neighboursJSON?geonameId=')

  .factory('ccCountries', function(ccRequest, CC_COUNTRY_INFO, CC_USERNAME) {
    return function() {
      return ccRequest.getData(CC_COUNTRY_INFO+CC_USERNAME);
    };
  })

  .factory('ccCapitals', function(ccRequest, CC_SEARCH_PREFIX, CC_Q, CC_COUNTRY, CC_NAME_EQUALS, CC_FCODE, CC_USERNAME) {
    return function(capitalName, countryCode) {
      return ccRequest.getData(CC_SEARCH_PREFIX+CC_Q+capitalName+'&'+CC_COUNTRY+countryCode+'&'+CC_NAME_EQUALS+capitalName+'&isNameRequired=true&'+CC_FCODE+'&'+CC_USERNAME);
    };
  })

  .factory('ccNeighbours', function(ccRequest, CC_NEIGHBORS_PREFIX, CC_Q, CC_COUNTRY, CC_NAME_EQUALS, CC_FCODE, CC_USERNAME) {
    return function(geonameId) {
      return ccRequest.getData(CC_NEIGHBORS_PREFIX+geonameId+'&'+CC_USERNAME);
    };
  })

  .factory('ccRequest', function($q, $http) {
    return {
      getData: function(url) {
        var deferred = $q.defer();
        debug("url = " + url);
        $http({
          cache : true,
          method: 'GET',
          url: url
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
