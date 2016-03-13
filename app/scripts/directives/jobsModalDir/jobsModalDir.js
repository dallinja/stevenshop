app.directive('jobsModal',function() {
	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/jobsModalDir/jobsModalDir.html',
		scope: {

		},
		link: function(scope, element, attr) {
			scope.pub = true;
			scope.closeModal = function() {
				$('#jobModal').modal('hide');
			};
		},
		controller: function($scope, adminService, $timeout) {

			$scope.editJob = function() {
				adminService.editJob().then(function (data) {
					$scope.name
					$scope.style
					$scope.type
					$scope.description
					$scope.published
				})
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
