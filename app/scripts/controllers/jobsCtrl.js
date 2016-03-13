app.controller('jobsCtrl', ['$scope', 'adminService', function($scope, service) {
	$scope.test = 'whyyy '
	$scope.sortType = ['type','order'];
	$scope.sortReverse = false;
	$scope.sort = function(title) {
		if ($scope.sortType == title) {
			$scope.sortReverse = !$scope.sortReverse;
		}
		$scope.sortType = title;
	}

}]);