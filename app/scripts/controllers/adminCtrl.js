app.controller('adminCtrl', ['$scope', 'adminService', function($scope, service) {

    // Get initial data
    $scope.serviceData = service.query();

    // Insert
    $scope.insert = function () {
        service.insert();
    };

    // Delete
    $scope.delete = function (id) {
        var defintelyDelete = confirm('Are you sure you want to delete this job? It will be gone forever!');
        if (defintelyDelete) {
            service.delete(id);
        }
    };
    // $scope.inputToggle = function() {
    //     service.inputToggle();
    // }
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
