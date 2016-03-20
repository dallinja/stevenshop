app.controller('adminCtrl', ['$scope', 'adminService', '$state', function($scope, service, $state) {

    // Set loading gif
    $scope.loading = false;

    // Check if logged in
    var ref = new Firebase("https://stevenshop.firebaseio.com");
    ref.onAuth(
        function (authData) {
            if (authData) {
                // On success
                $state.go('admin.jobs');
            } else {
                // If not authenticated, send to Login
                $state.go('login');
            }
        }
    );

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

    // Login
    $scope.login = function () {
        // Set loading gif
        $scope.loading = true;

        // Login user
        ref.authWithPassword({
            email: $scope.email,
            password: $scope.password
        }, function(error, authData) {
            if (error) {
                // Failed login
                console.log("f");
            } else {
                // On succesful login, send to jobs
                $state.go('admin.jobs');
                console.log("t");
            }
            // End loading gif
            $scope.loading = false;
        });
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
