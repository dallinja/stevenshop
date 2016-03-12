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
}])
.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});
