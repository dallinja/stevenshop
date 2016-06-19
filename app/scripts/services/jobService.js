app.factory('jobService', ['$firebase', '$firebaseArray', '$firebaseObject', '$q', function($firebase, $firebaseArray, $firebaseObject, $q) {
    var service = {};

    // Firebase ref
    var refer = "https://stevenshop.firebaseio.com/jobs";
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
        var jobs = $firebaseArray(ref);
        jobs.$add({
            'images': {},
            'description': '',
            'order': 1,
            'name': '',
            'style': '',
            'type': '',
            'published': false
        }).then(function(ref) {
            deferred.resolve(ref.key());
        })

        // Return promise
        return deferred.promise;
    };

    service.getAndSaveJob = function (job) {
        // Create promise
        var deferred = $q.defer();

        var jobsArray = $firebaseArray(ref);
        jobsArray.$loaded().then(function() {
            var jobObj = jobsArray.$getRecord(job.$id);
            jobObj.order = job.order;
            jobObj.name = job.name;
            jobObj.style = job.style;
            jobObj.type = job.type;
            jobObj.description = job.description;
            jobObj.published = job.published;
            jobsArray.$save(jobObj).then(function (reference) {
                console.log('Saved!!!!!!')
                deferred.resolve(true);
            });
        })
        return deferred.promise;
    };

    service.newJobOrderUpdate = function (job) {
        var deferred = $q.defer();
        var jobsArray = $firebaseArray(ref);
        jobsArray.$loaded().then(function() {
            for (var i = 0; i < jobsArray.length; i++) {
                if(jobsArray[i].type === job.type) {
                    jobsArray[i].order++;
                    jobsArray.$save(jobsArray.$getRecord(jobsArray[i].$id)).then(function() {
                    }, function(error) {
                        console.log("Error1:", error);
                    });
                }
            };
            deferred.resolve(true);
        }, function(error) {
            console.log("Error2:", error);
        });
        return deferred.promise;
    }

    service.publish = function (job) {
        var deferred = $q.defer();

        var jobUrl = refer + '/' + job.$id;
        var jobRef = new Firebase(jobUrl);
        var jobObj = $firebaseObject(jobRef);
        jobObj.$loaded().then(function () {
            jobObj.published = job.published;
            jobObj.$save().then(function(ref) {
                deferred.resolve(true);
            }, function(error) {
                console.log("Error:", error);
            });
        })
        return deferred.promise;
    };

    service.move = function (job1, job2) {
        var deferred = $q.defer();
        var jobUrl = refer + '/' + job1.$id;
        var jobRef = new Firebase(jobUrl);
        var jobObj = $firebaseObject(jobRef);
        jobObj.$loaded().then(function () {
            jobObj.order = job1.order;
            jobObj.$save().then(function(ref) {
                var jobUrl = refer + '/' + job2.$id;
                var jobRef = new Firebase(jobUrl);
                var jobObj = $firebaseObject(jobRef);
                jobObj.$loaded().then(function () {
                    jobObj.order = job2.order;
                    jobObj.$save().then(function(ref) {
                        deferred.resolve(true);
                    }, function(error) {
                        console.log("Error:", error);
                    });
                });
            }, function(error) {
                console.log("Error:", error);
            });
        })
        return deferred.promise;
    };

    // Update job
    service.update = function (currentJobId, values) {
        // Create promise
        var deferred = $q.defer();

        // Update job
        var updateRef = new Firebase("https://stevenshop.firebaseio.com/jobs/" + currentJobId);
        updateRef.update({
            // Images update on their own apart from here
            'description': values.desc || null,
            'order': 1,
            'name': values.name || 'No name',
            'style': values.style || null,
            'type': values.type || null,
            'published': values.pub || false
        },
        // On completion
        function (error) {
            if (error) {
                deferred.resolve(false);
            } else {
                // Succesfull return
                deferred.resolve(true);
            }
        });

        // Return promise
        return deferred.promise;
    };


    service.delete = function (job) {
        var deferred = $q.defer();
        var jobsArray = $firebaseArray(ref);
        jobsArray.$loaded().then(function() {
            for (var i = 0; i < jobsArray.length; i++) {
                if(jobsArray[i].type === job.type && jobsArray[i].order > job.order) {
                    jobsArray[i].order--;
                    jobsArray.$save(jobsArray.$getRecord(jobsArray[i].$id)).then(function() {
                        // success
                    }, function(error) {
                        console.log("Error1:", error);
                    });
                }
                if (jobsArray[i].$id === job.$id) {
                    jobsArray.$remove(jobsArray.$getRecord(jobsArray[i].$id)).then(function() {
                        // success
                    }, function(error) {
                        console.log("Error1:", error);
                    });
                }
            };
            deferred.resolve(true);
        }, function(error) {
            console.log("Error2:", error);
        });
        return deferred.promise;

    }

    // Delete job on cancel
    service.deleteJob = function (id) {
        // Create promise
        var deferred = $q.defer();

        // Delete object at this url
        var delRef = new Firebase('https://stevenshop.firebaseio.com/jobs/' + id);
        var delObj = $firebaseObject(delRef);
        delObj.$remove().then(function (ref) {
                // Success
                deferred.resolve(true);
            }, function(error) {
                // Failed
                console.log("Error: ", error)
                deferred.resolve(false);
            }
        );

        // Return promise
        return deferred.promise;
    };

    return service;
}]);
