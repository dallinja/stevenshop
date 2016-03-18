app.controller('pagesCtrl', ['$scope', 'adminService', function($scope, service) {

	$scope.serviceData = service.query();

	$scope.editPage = function(page) {
		$('#pageModal').modal({backdrop: 'static'});
		// pagesService.editpage().then(function (data) {
			$scope.page = page;

		// })
	}

}]);