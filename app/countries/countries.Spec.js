describe("ccAppViews", function() {

  beforeEach(module('ccAppViews'));

  // Initialize the controller and a mock scope
  describe('CountriesCtrl', function() {

    var ctrl, scope, location;
    //var results = {status: true};

    beforeEach(inject(function(){
      console.log("===========================");
      console.log("=====Countries.Spec.js=====");
      console.log("===========================");
    }));

    beforeEach(inject(function($controller, $rootScope, $location){

      location = $location;
      scope = $rootScope.$new();
      ctrl = $controller('CountriesCtrl', {
        $scope: scope
      });
    }));
    // Check some defaults
    it('should have some variables defined', function(){
      // Check if they are defined
      expect(scope.pageClass).toBeDefined();
      expect(scope.results).toBeDefined();
      expect(scope.errorMsg).toBeDefined();
      expect(scope.errPresent).toBeDefined();
      expect(scope.dataReady).toBeDefined();
      expect(scope.loading).toBeDefined();
    });

    it('should have some variables with default values', function(){
      // Check if the default values are correct
      expect(scope.loading).toBeTruthy();
      expect(scope.dataReady).toBeFalsy();
    });

    // Check go function
    it('should have a go function that lets the user browse to a country detail page', function(){
      // Check if function exsists
      expect(scope.go).toBeDefined();

      // Execute go function
      scope.go('/path');

      // The path should now be changed by the go function
      expect(location.path()).toBe('/path');
    });

    // Check success while loading data from Service
    it('should have dataReady when API returns success', inject(function(ccCountries, $httpBackend, $rootScope){
      var result = {};
      result.geonames = {continent: 'EU'};

      // Act on JSONP request
      $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=dxeware')
        .respond(result);
      // Trigger Angular's digest cycle
      $rootScope.$digest();

      // Ensure that the HTTP mock code is applied
      $httpBackend.flush();
      // When the api gives an error the error message should be set
      expect(scope.loading).toBe(false);
      expect(scope.dataReady).toBe(true);

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

      // Ensure that the HTTP mock code is applied
      $httpBackend.flush();
      // When the api gives an error the error message should be set
      expect(scope.errPresent).toBe(true);
      expect(scope.errorMsg).toBe('Error: the call to the server has FAILED!');

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
      $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=dxeware')
        .respond(result);
      // Trigger Angular's digest cycle
      $rootScope.$digest();

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
