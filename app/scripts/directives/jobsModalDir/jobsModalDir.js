app.directive('jobsModal',function() {
	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/jobsModalDir/jobsModalDir.html',
		scope: {
			deleteJob: '&',
			updateJob: '&',
			currentJobId: '=',
			images: '=',
			job: '='
		},
		link: function(scope, element, attr) {
			scope.pub = true;
			scope.closeModal = function() {
				$('#jobModal').modal('hide');
			};
		},
		controller: function($scope, adminService, jobsService, $timeout) {

			$scope.updateJob= function (job) {
				jobsService.getJob(job);
				$('#jobModal').modal('hide');
			}

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
		}
	};
});


// addJob(name, style, type, seg, desc, pub, imgUrls)
