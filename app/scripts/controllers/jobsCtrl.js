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

	// Move job up or down within a segment
    $scope.move = function(dir, index) {
        $scope.filteredJobs[index].order += dir;
        $scope.filteredJobs[index + dir].order -= dir;
        var job1 = $scope.filteredJobs[index];
        var job2 = $scope.filteredJobs[index + dir];
        jobService.move(job1, job2).then(function () {
			$state.reload();
		});
    }

	$scope.editJob = function(job) {
		$scope.state = 'edit';
		$scope.currentJobId = job.$id;
		$('#jobModal').modal({backdrop: 'static'});
		$scope.job = job;
	}

	$scope.publish = function (job) {
		jobService.publish(job).then(function () {
			$state.reload();
		});
	}
	// $scope.published = function (id) {
	// 	return $scope.selected.indexOf(id) >= 0;
	// }

	// Add job on button click
	$scope.addJob = function () {
		$scope.state = 'create';
		// Start loaging gif
		$scope.loading = true;

		// Create job
		jobService.create().then(
			// On completion
			function (key) {
				console.log(key);
				if (key) {
					// Get current job ID for update
					$scope.currentJobId = key;
					// Close loading gif
					$scope.loading = false;
					// load modal
					$('#jobModal').modal({backdrop: 'static'});
					$scope.job = {
						'$id': key,
						'images': {},
			            'description': '',
			            'order': 1,
			            'name': '',
			            'style': '',
			            'type': '',
			            'published': true
					}
				} else {
					// Insert failed error

				}
			}
		);
	};

	// Delete job
    $scope.delete = function (job) {
        var defintelyDelete = confirm('Are you sure you want to delete this job? It will be gone forever!');
        if (defintelyDelete) {
            jobService.delete(job).then(function(res) {
            	$state.reload();
            });
        }
    };

	// Delete job on cancel
	$scope.deleteJob = function () {
		// Delete upload jobs array
		$scope.images = [];

		// Send delete request to firebase
		jobService.deleteJob($scope.currentJobId).then(
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
