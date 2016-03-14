app.factory('imageService', ['$firebase', '$firebaseArray', '$q', function($firebase, $firebaseArray, $q) {
    var service = {};

    // Global
    var ref = new Firebase("https://stevenshop.firebaseio.com/jobs");

    // Loading
	service.loading = true;

    // READ
    service.query = function () {
        // Firebase URL
        var imageObjs = new $firebaseArray(ref);
        // TODO: CAHNGE THIS REF ^^ to get from a job

        // On complete
        imageObjs.$loaded().then(function(response) {
            service.images = response;
            service.loading = false;
        });

        return service;
    };

    // CREATE
    service.create = function (newImageString, jobId) {
        // Create promise
        var deferred = $q.defer();
        // Update ref for Job ID
        var ref = new Firebase("https://stevenshop.firebaseio.com/jobs/" + jobId + '/images/');

        // Push object
        var image = ref.push();
        image.set(
            // Push this object to firebase
            {'base64String': newImageString},
            // On success
            function (error) {
                if (error) {
                    deferred.resolve(false);
                } else {
                    // Succesfull return
                    deferred.resolve(
                        // Return uploaded base64 string
                        newImageString
                    );
                }
            }
        );
        return deferred.promise;
    };

    // Return service
    return service;
}]);
