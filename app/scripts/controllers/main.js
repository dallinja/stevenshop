app.controller('MainCtrl',['$scope', 'dataService', 'jobService', function($scope, dataService, jobService) {

	// Set loading gif
	$scope.serviceResponse = {
		loading: true
	};

	// Get jobs
    $scope.serviceResponse = jobService.query();

	// Footer
	$scope.test = dataService.test;
}]);
