describe("ccLibrary", function() {

  beforeEach(module('ccLibrary'));

  beforeEach(inject(function() {
    console.log("===========================");
    console.log("=====cc-library.Spec.js====");
    console.log("===========================");
  }));

  // Check success while loading data from Service
  it('should be sucess when API returns 200', inject(function(ccCountries, $httpBackend, $rootScope){
    // Act on JSONP request
    //$httpBackend.whenJSONP('http://api.geonames.org/countryInfoJSON?username=dxeware').respond(404);
    $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=dxeware').respond(200);
    // Trigger Angular's digest cycle
    $rootScope.$digest();
    var success = false;
    ccCountries().then(function() {
        success = true;
    });
    // Ensure that the HTTP mock code is applied
    $httpBackend.flush();
    // When the api gives an error the error message should be set
    //expect(ctrl.error).toBeDefined();
    expect(success).toBe(true);
    // Ensure test is run
    $httpBackend.verifyNoOutstandingRequest();
  }));

  it('should !success when API fails', inject(function(ccCountries, $httpBackend, $rootScope){
    // Act on JSONP request
    //$httpBackend.whenJSONP('http://api.geonames.org/countryInfoJSON?username=dxeware').respond(404);
    $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=dxeware').respond(404);
    // Trigger Angular's digest cycle
    $rootScope.$digest();
    var success = false;
    ccCountries().then(function() {
        success = true;
    });
    // Ensure that the HTTP mock code is applied
    $httpBackend.flush();
    // When the api gives an error the error message should be set
    //expect(ctrl.error).toBeDefined();
    expect(success).toBe(false);
    // Ensure test is run
    $httpBackend.verifyNoOutstandingRequest();
  }));

});
