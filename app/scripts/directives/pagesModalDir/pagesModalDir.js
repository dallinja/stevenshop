app.directive('pagesModal',function() {
	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/pagesModalDir/pagesModalDir.html',
		scope: {
			jobName: '='
		},
		link: function(scope, element, attr) {
			scope.pub = true;
			scope.closeModal = function() {
				$('#pageModal').modal('hide')
			};
		},
		controller: function($scope, adminService, $timeout) {
			$scope.addPage = function(name, style, type, desc, pub) {
				// adminService.addJob(name);
				adminService.addPage(
					{
						order: 1,
						name: name,
						style: style,
						type: type
					}
				);
				$scope.closeModal();
				// $timeout(function() {
				// 	$scope.name = "";
				// 	$scope.style = "";
				// 	$scope.type = "";
				// 	$scope.desc = "";
				// }, 1000);
			}
		}
	};
});


// addJob(name, style, type, seg, desc, pub, imgUrls)