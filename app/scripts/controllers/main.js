app.controller('MainCtrl',['$scope', 'dataService', 'jobsService', function($scope, dataService, jobsService) {

	// Set loading gif
	$scope.serviceResponse = {
		loading: true
	};

	// Get jobs
    $scope.serviceResponse = jobsService.query();

	// Footer
	$scope.test = dataService.test;
}]);
