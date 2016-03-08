app.controller('MainCtrl',['$scope', 'dataService', function($scope, dataService) {
	$scope.test = dataService.test;
}]);