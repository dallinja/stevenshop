app.factory('imageService', ['$firebase', '$firebaseArray', '$q', function($firebase, $firebaseArray, $q) {
    var service = {};

    // Global
    var ref = new Firebase("https://stevenshop.firebaseio.com/images");

    // Loading
	service.loading = true;

    // READ
    service.query = function () {
        // Firebase URL
        var imageObjs = new $firebaseArray(ref);

        // On complete
        imageObjs.$loaded().then(function(response) {
            service.images = response;
            console.log(response);
            service.loading = false;
        });

        return service;
    };

    // CREATE
    service.create = function (newImageString) {
        var deferred = $q.defer();
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
                        // Query all images
                        service.query()
                    );
                }
            }
        );
        return deferred.promise;
    };

    // Return service
    return service;
}]);
