describe("ccAppViews", function() {

  beforeEach(module('ccAppViews'));

  // Initialize the controller and a mock scope
  describe('CapitalssCtrl', function() {

    var ctrl, scope, location;
    //var results = {status: true};

    beforeEach(inject(function(){
      console.log("===========================");
      console.log("=====Capitals.Spec.js=====");
      console.log("===========================");
    }));

    beforeEach(inject(function($controller, $rootScope, $location,
                                $routeParams, CC_COUNTRY_INFO, CC_USERNAME,
                                CC_SEARCH_PREFIX, CC_Q, CC_COUNTRY,
                                CC_NAME_EQUALS, CC_FCODE, CC_NEIGHBORS_PREFIX){
      location = $location;
      $routeParams.country = 'LT';
      scope = $rootScope.$new();

      ctrl = $controller('CapitalsCtrl', {
        $scope: scope
      });

      //define constants to be used for http url's
      cc_country_info = CC_COUNTRY_INFO;
      cc_username = CC_USERNAME;
      cc_search_prefix = CC_SEARCH_PREFIX;
      cc_q = CC_Q;
      cc_country = CC_COUNTRY;
      cc_name_equals = CC_NAME_EQUALS;
      cc_fcode = CC_FCODE;
      cc_neighbours_prefix = CC_NEIGHBORS_PREFIX;
    }));

    // Check some defaults
    it('should have some variables defined', function(){
      // Check if they are defined
      expect(scope.pageClass).toBeDefined();
      expect(scope.errorMsg).toBeDefined();
      expect(scope.errPresent).toBeDefined();
      expect(scope.dataReady).toBeDefined();
      expect(scope.thisCountryInfo).toBeDefined();
      expect(scope.capitalInfo).toBeDefined();
      expect(scope.neighbours).toBeDefined();
    });

    it('should have some variables with default values', function(){
      // Check if the default values are correct
      expect(scope.errPresent).toBeFalsy();
      expect(scope.dataReady).toBeFalsy();
    });

    // Check go function
    it('should have a go function that lets the user browse to a capital detail page', function(){
      // Check if function exsists
      expect(scope.go).toBeDefined();

      // Execute go function
      scope.go('/path');

      // The path should now be changed by the go function
      expect(location.path()).toBe('/path');
    });

    // Check success while loading data from Service
    it('should have capital info and neighbour info when countries, capitals and neighbours APIs return success', inject(function(ccCountries, $httpBackend, $rootScope){
      var result1 = {}, result2 = {}, result3 = {};
      result1.geonames = [ {
          capital: 'Vilnius',
          countryCode: 'LT',
          geonameId: 597427
        }];

      result2.geonames = [ {
          name: 'Vilnius',
          countryCode: 'LT'
        }];

      result3.geonames = [ {
          countryName: 'Belarus'
        }];

      // Act on JSONP request
      $httpBackend.expect('GET', cc_country_info+cc_username)
        .respond(result1);
      // Trigger Angular's digest cycle
      $rootScope.$digest();

      ccCountries();

      // Act on JSONP request
      $httpBackend.expect('GET', cc_search_prefix+cc_q+result1.geonames[0].capital+'&'+cc_country+result1.geonames[0].countryCode+'&'+cc_name_equals+result1.geonames[0].capital+'&isNameRequired=true&'+cc_fcode+'&'+cc_username)
        .respond(result2);

      // Act on JSONP request
      $httpBackend.expect('GET', cc_neighbours_prefix+result1.geonames[0].geonameId+'&'+cc_username)
        .respond(result3);

      // Ensure that the HTTP mock code is applied
      $httpBackend.flush();

      // when ccCapitals API succeeds, expect results
      expect(scope.capitalInfo.name).toBe('Vilnius');
      expect(scope.capitalInfo.countryCode).toBe('LT');

      // when ccNeighbours API succeeds, expect results
      expect(scope.neighbours.geonames[0].countryName).toBe('Belarus');

      // Ensure test is run
      $httpBackend.verifyNoOutstandingRequest();
    }));

    // Check errors when ccCapitals fails with error 404
    it('should have error when capital API fails', inject(function(ccCountries, $httpBackend, $rootScope){
      var result1 = {}, result2 = {}, result3 = {};
      result1.geonames = [ {
          capital: 'Vilnius',
          countryCode: 'LT',
          geonameId: 597427
        }];

      result2.geonames = [ {
          name: 'Vilnius',
          countryCode: 'LT'
        }];

      result3.geonames = [ {
          countryName: 'Belarus'
        }];

      // Act on JSONP request
      $httpBackend.expect('GET', cc_country_info+cc_username)
        .respond(result1);
      // Trigger Angular's digest cycle
      $rootScope.$digest();

      ccCountries();

      // Act on JSONP request
      $httpBackend.expect('GET', cc_search_prefix+cc_q+result1.geonames[0].capital+'&'+cc_country+result1.geonames[0].countryCode+'&'+cc_name_equals+result1.geonames[0].capital+'&isNameRequired=true&'+cc_fcode+'&'+cc_username)
        .respond(404);

      // Act on JSONP request
      $httpBackend.expect('GET', cc_neighbours_prefix+result1.geonames[0].geonameId+'&'+cc_username)
        .respond(result3);

      // Ensure that the HTTP mock code is applied
      $httpBackend.flush();

      // When the api gives an error the error message should be set
      expect(scope.errPresent).toBe(true);
      expect(scope.errorMsg).toBe('CATCH Error: the call to the server has FAILED!');

      // Ensure test is run
      $httpBackend.verifyNoOutstandingRequest();
    }));

    // Check errors when ccNeighbours fails - API returns a status element
    it('should have error when capital API fails', inject(function(ccCountries, $httpBackend, $rootScope){
      var result1 = {}, result2 = {}, result3 = {};
      result1.geonames = [ {
          capital: 'Vilnius',
          countryCode: 'LT',
          geonameId: 597427
        }];

      result2.geonames = [ {
          name: 'Vilnius',
          countryCode: 'LT'
        }];

      result3.status = true;

      // Act on JSONP request
      $httpBackend.expect('GET', cc_country_info+cc_username)
        .respond(result1);
      // Trigger Angular's digest cycle
      $rootScope.$digest();

      ccCountries();

      // Act on JSONP request
      $httpBackend.expect('GET', cc_search_prefix+cc_q+result1.geonames[0].capital+'&'+cc_country+result1.geonames[0].countryCode+'&'+cc_name_equals+result1.geonames[0].capital+'&isNameRequired=true&'+cc_fcode+'&'+cc_username)
        .respond(result2);

      // Act on JSONP request
      $httpBackend.expect('GET', cc_neighbours_prefix+result1.geonames[0].geonameId+'&'+cc_username)
        .respond(result3);

      // Ensure that the HTTP mock code is applied
      $httpBackend.flush();

      // When the api gives an error the error message should be set
      expect(scope.neighbours.errMsg).toBe('Server returned error - no neighbours returned!');

      // Ensure test is run
      $httpBackend.verifyNoOutstandingRequest();
    }));

    // Check errors while loading data from Service - respond 404
    it('should be display error when API fails', inject(function(ccCountries, $httpBackend, $rootScope){
      // Act on JSONP request
      $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=dxeware').respond(404);
      // Trigger Angular's digest cycle
      $rootScope.$digest();
      var status = false;
      ccCountries();
      // Ensure that the HTTP mock code is applied
      $httpBackend.flush();

      // When the api gives an error the error message should be set
      expect(scope.errPresent).toBe(true);
      expect(scope.errorMsg).toBe('CATCH Error: the call to the server has FAILED!');

      // Ensure test is run
      $httpBackend.verifyNoOutstandingRequest();
    }));

    // Check errors while loading data from Service - API returns a status element
    it('should be display error when API returns a status element', inject(function(ccCountries, $httpBackend, $rootScope){
      var result = {};
      result.status = true;
      result.status.message = "Authorization Exception";
      result.status.value = 10;
      // Act on JSONP request
      $httpBackend.expect('GET', cc_country_info+cc_username)
        .respond(result);
      // Trigger Angular's digest cycle
      $rootScope.$digest();

      ccCountries();

      // Ensure that the HTTP mock code is applied
      $httpBackend.flush();
      // When the api gives an error the error message should be set
      expect(scope.errPresent).toBe(true);
      expect(scope.errorMsg).toBe("Error: " + result.status.message + " [Error code: " + result.status.value + "]");

      // Ensure test is run
      $httpBackend.verifyNoOutstandingRequest();
    }));

  });

});
