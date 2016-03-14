app.controller('jobsCtrl', ['$scope', 'jobService', function($scope, jobService) {
	$scope.test = 'whyyy '
	$scope.sortType = ['type','order'];
	$scope.sortReverse = false;
	$scope.sort = function(title) {
		if ($scope.sortType == title) {
			$scope.sortReverse = !$scope.sortReverse;
		}
		$scope.sortType = title;
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
