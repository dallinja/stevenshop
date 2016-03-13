app.factory('jobsService', ['$firebase', '$firebaseArray', '$q', function($firebase, $firebaseArray, $q) {
    var service = {};

    // Loading
	service.loading = true;

    service.query = function () {
        // Firebase URL
        var jobsRef = new Firebase("https://stevenshop.firebaseio.com/jobs");
        var jobsObj = new $firebaseArray(jobsRef);

        // On complete
        jobsObj.$loaded().then(function(response) {
            service.jobs = response;
            service.loading = false;
        });

        return service;
    };

    return service;
}]);
