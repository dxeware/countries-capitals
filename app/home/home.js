viewsModule
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl : 'home/home.html',
      controller : 'HomeCtrl'
    });
  })

  .controller('HomeCtrl', function($scope, $location) {
    $scope.pageClass = 'page-home';

    //Call route when button clicked
    $scope.go = function (path) {
      $location.path(path);
    };

  });
