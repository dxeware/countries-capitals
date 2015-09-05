viewsModule
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl : 'home/home.html',
      controller : 'HomeCtrl'
    });
  })

  .controller('HomeCtrl', function($scope, $location) {
    $scope.pageClass = 'page-home';

    //Call countries route when button clicked
    $scope.goCountries = function (path) {
      $location.path(path);
    };

  });
