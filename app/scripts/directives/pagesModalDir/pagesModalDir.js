app.directive('pagesModal',function() {
	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/pagesModalDir/pagesModalDir.html',
		scope: {
			jobName: '='
		},
		link: function(scope, element, attr) {
			scope.closeModal = function() {
				$('#pageModal').modal('hide')
			};
		},
		controller: function($scope, adminService, $timeout) {
				// adminService.addJob(name);
				$scope.updatePage= function (page) {
					pagesService.getPage(page).then(function() {
						$('#pageModal').modal('hide');
					});
					
				}
				// $timeout(function() {
				// 	$scope.name = "";
				// 	$scope.style = "";
				// 	$scope.type = "";
				// 	$scope.desc = "";
				// }, 1000);

		}
	};
});


// addJob(name, style, type, seg, desc, pub, imgUrls)