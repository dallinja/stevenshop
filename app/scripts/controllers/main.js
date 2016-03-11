app.controller('MainCtrl',['$scope', 'dataService', function($scope, dataService) {
    // Footer
	$scope.test = dataService.test;
}]);
