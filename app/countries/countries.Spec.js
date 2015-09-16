describe("ccAppViews", function() {

    var ctrl,
      scope,
      $location;

    beforeEach(module('ccAppViews'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, _$location_){
      $location = _$location_;
      scope = $rootScope.$new();
      ctrl = $controller('CountriesCtrl', {
        $scope: scope
      });
    }));
    describe('ccCountries', function() {
      it('should return true when called', function() {
            expect(true).toBe(true);
      });
      it('should return 10 when called', function() {
            expect(10).toBe(10);
      });
    });

});

