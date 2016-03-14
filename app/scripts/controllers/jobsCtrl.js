app.controller('jobsCtrl', ['$scope', 'adminService', 'jobsService', function($scope, adminService, jobsService) {
	$scope.sortType = ['type','order'];
	$scope.sortReverse = false;
	$scope.sort = function(title) {
		if ($scope.sortType == title) {
			$scope.sortReverse = !$scope.sortReverse;
		}
		$scope.sortType = title;
	}
	$scope.editJob = function(job) {
		$('#jobModal').modal('show');
		// jobsService.editJob().then(function (data) {
			console.log(job);
			console.log(job.name);
			$scope.name = job.name;
			$scope.style = job.style;
			$scope.type = job.type;
			$scope.description = job.description;
			$scope.published = job.published;
		// })
		$scope.addEditJob = function (job) {

		}
	}

}]);