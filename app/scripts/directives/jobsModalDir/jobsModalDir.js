app.directive('jobsModal',function() {
	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/jobsModalDir/jobsModalDir.html',
		scope: {
			deleteJob: '&',
			currentJobId: '=',
			images: '='
		},
		link: function(scope, element, attr) {
			scope.pub = true;
			scope.closeModal = function() {
				$('#jobModal').modal('hide');
			};
		},
		controller: function($scope, adminService, jobService, $timeout) {

			$scope.addJob = function(name, style, type, desc, pub) {
				// adminService.addJob(name);
				adminService.addJob(
					{
						order: 1,
						name: name,
						style: style,
						type: type,
						desc: desc,
						pub: pub
						// imgUrls: imgUrls
					}
				);
				$scope.closeModal();
				$timeout(function() {
					$scope.name = "";
					$scope.style = "";
					$scope.type = "";
					$scope.desc = "";
				}, 1000);
			};

			// Update job on save button click
			$scope.updateJob = function () {
		        // Build values
		        var values = {
		            name: $scope.name,
		            style: $scope.style,
		            type: $scope.type,
		            desc: $scope.desc,
		            pub: $scope.pub,
		            images: $scope.images
		        };

		        // Run update from service
		        jobService.update($scope.currentJobId, values).then(
		            function (response) {
						if (response) {
							// Success
		                    $scope.closeModal();
							// Clear the fields
							$scope.name = '';
							$scope.style = '';
							$scope.type = '';
							$scope.desc = '';
						} else {
							// Failue
							console.log('Update failed');
						}
					}
		        );
			};
		}
	};
});
