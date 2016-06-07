app.controller('jobsCtrl', ['$scope', 'jobService', '$state', function($scope, jobService, $state) {
	// Check if logged in
    var ref = new Firebase("https://stevenshop.firebaseio.com");
    ref.onAuth(
        function (authData) {
            if (authData) {
				// If logged in
            } else {
				// If not authenticated, send to login
                $state.go('login');
            }
        }
    );

	$scope.sortType = ['segOrder','order'];
	$scope.sortReverse = false;
	$scope.bars = true; // separators for segments on default
	$scope.sort = function(title) {
		if ($scope.sortType == title) {
			$scope.sortReverse = !$scope.sortReverse;
		}
		if (typeof $scope.sortType == 'object' && typeof title == 'object') {
			$scope.sortReverse = !$scope.sortReverse;
		}
		$scope.sortType = title;
		$scope.bars = false;
		if (typeof title == "object") {
			$scope.bars = true;
		}
	}
	$scope.editJob = function(job) {
		$scope.state = 'edit';
		$('#jobModal').modal({backdrop: 'static'});
		// jobsService.editJob().then(function (data) {
			$scope.job = job;

		// })
	}

	// Add job on button click
	$scope.addJob = function () {
		$scope.state = 'create';
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
