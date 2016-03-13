app.directive('siteHeader',function() {
	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/headerDir/headerDir.html',
		scope: {

		},
		link: function (scope, element, attr) {
		},
		controller: function($scope, headerService, $location) {
				$scope.pagesData = headerService.getNav();
				$scope.curUrl = $location.path();
				if ($location.path().indexOf('admin') != -1) {
					$scope.admin = true;
				} else {
					$scope.admin = false;
				}
		}
	};
});
