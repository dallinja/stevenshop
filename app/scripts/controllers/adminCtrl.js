app.controller('adminCtrl', ['$scope', 'adminService', function($scope, service) {

    // Get initial data
    $scope.serviceData = service.query();

    // Insert
    $scope.insert = function () {
        service.insert();
    };

    // Delete
    $scope.delete = function (id) {
        service.delete(id);
    };
}]);
