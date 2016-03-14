app.controller('jobsCtrl', ['$scope', 'jobService', function($scope, jobService) {
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

	// Add job on button click
	$scope.addJob = function () {
		// Start loaging gif
		$scope.loading = true;

		// Create job
		jobService.create().then(
			// On completion
			function (response) {
				if (response) {
					// Get current job ID for update
					$scope.currentJobId = response;
					// Close loading gif
					$scope.loading = false;
				} else {
					// Insert failed error

				}
			}
		);
	};

	// Update job on save button click
	$scope.updateJob = function () {

	};

	// Delete job on cancel
	$scope.deleteJob = function () {
		// Delete upload jobs array
		$scope.images = [];

		// Send delete request to firebase
		jobService.delete($scope.currentJobId).then(
			function (response) {
				if (response) {
					// Delete success
					$('#jobModal').modal('hide');
				} else {
					// Delete failed
					// Don't do anything. Let user click cancel again.
				}
			}
		);
	};
}]);
