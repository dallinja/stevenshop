app.directive('jobsModal',function() {
	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/jobsModalDir/jobsModalDir.html',
		scope: {
			name: '='
		},
		link: function(scope, element, attr) {
			scope.closeModal = function() {
				$('#jobModal').modal('hide')
			}
		},
		controller: function($scope, adminService) {
			$scope.addJob = function(name) {
				adminService.addJob(name);
				// adminService.addJob(
				// 	{
				// 		name: name,
				// 		style: style,
				// 		type: type,
				// 		seg: seg,
				// 		desc: desc,
				// 		pub: pub,
				// 		imgUrls: imgUrls
				// 	}
				// );
				$scope.closeModal();
			}
		}
	};
});


// addJob(name, style, type, seg, desc, pub, imgUrls)