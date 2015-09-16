describe("ccAppViews", function() {

    beforeEach(module('ccAppViews'));

    // Initialize the controller and a mock scope
    describe('CountriesCtrl', function() {
      var ctrl, scope;
      beforeEach(inject(function($controller, $rootScope){
        //$location = _$location_;
        scope = $rootScope.$new();
        ctrl = $controller('CountriesCtrl', {
          $scope: scope
        });
      }));
      // Check some defaults
      it('should have some default variables defined', function(){
        // Check if they are defined
        expect(scope.pageClass).toBeDefined();
        expect(scope.loading).toBeDefined();
        expect(scope.dataReady).toBeDefined();
        expect(scope.loading).toBeDefined();

        // Check if the default values are correct
        expect(scope.loading).toBeTruthy();
        expect(scope.dataReady).toBeFalsy();
      });
    });

});

