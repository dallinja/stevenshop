app.factory('jobService', ['$firebase', '$firebaseArray', '$q', function($firebase, $firebaseArray, $q) {
    var service = {};

    // Firebase ref
    var ref = new Firebase("https://stevenshop.firebaseio.com/jobs");

    // Loading
	service.loading = true;

    // Query jobs
    service.query = function () {
        // Get jobs array
        var jobsObj = new $firebaseArray(ref);

        // On complete
        jobsObj.$loaded().then(function(response) {
            // Send jobs to controller and turn off loading gif
            service.jobs = response;
            service.loading = false;
        });

        return service;
    };

    // Create job
    service.create = function () {
        // Create promise
        var deferred = $q.defer();

        // Push the job
        var key = ref.push({
            'images': {
                'url': '/images/logo.png'
            },
            'description': '',
            'order': '',
            'name': '',
            'style': '',
            'type': '',
            'published': false
        },
        // On completion
        function (error) {
            if (error) {
                deferred.resolve(false);
            } else {
                // Succesfull return
                deferred.resolve(key.key());
            }
        });

        // Return promise
        return deferred.promise;
    };

    // Update job
    service.update = function (values) {
        // Create promise
        var deferred = $q.defer();
        var job = ref.push();

        // Push the job
        job.set({
            'images': {
                'img1': '/someurl.jpg'
            },
            'description': values.desc,
            'order': values.order,
            'name': values.name,
            'style': values.style,
            'type': values.type,
            'published': values.pub
        },
        // On completion
        function (error) {
            if (error) {
                deferred.resolve(false);
            } else {
                // Succesfull return
                deferred.resolve(
                    // Query all images
                    service.query()
                );
            }
        });
    };

    // Delete job
    service.delete = function (id) {
        // Create promise
        var deferred = $q.defer();

        // Delete object at this url
        var ref = new Firebase('https://stevenshop.firebaseio.com/jobs/' + id);
        ref.remove(
            // When done
            function (error) {
                if (error) {
                    // Failed
                    deferred.resolve(false);
                } else {
                    // Success
                    deferred.resolve(true);
                }
            }
        );

        // Return promise
        return deferred.promise;
    };

    return service;
}]);
