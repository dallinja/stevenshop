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

    service.editJob = function (id) {
        var jobRef = new Firebase('https://stevenshop.firebaseio.com/jobs/' + id);
        service.job = jobRef;

        return service;
    }
    service.getJob = function (job) {
        var jobsRef = new Firebase('https://stevenshop.firebaseio.com/jobs');
        var jobsArray = $firebaseArray(jobsRef);
        jobsArray.$loaded().then(function() {
            var jobObj = jobsArray.$getRecord(job.$id);
            jobObj.name = job.name;
            jobObj.style = job.style;
            jobObj.type = job.type;
            jobObj.description = job.description;
            jobObj.published = job.published;
            jobsArray.$save(jobObj).then(function (ref) {
                console.log('Saved!!!!!!')
                console.log(ref);
            });
        })
        
        // jobsArray.$add(job).then(function (ref) {
        //     var id = ref.key();
        //     console.log("added record with id " + id);
        //     console.log(jobsArray.$indexFor(id));
        //     console.log(jobsArray.$indexFor(job.$id));
        //     var rec = jobsArray.$getRecord(id)
        //     console.log(rec);
        //     var rec1 = jobsArray.$getRecord(job.$id)
        //     rec1.name = job.name;
        //     console.log(rec1);
        //     jobsArray.$save(rec1).then(function (ref) {
        //         console.log('Saved!!!!!!')
        //         console.log(ref);
        //     });
        // })
        // jobsArray.$loaded().then(function () {
        //     jobsArray.$save(job.$id).then(function (ref) {
        //         console.log('Saved!!!!!!')
        //         console.log(ref);
        //     });
        // });
        // console.log(jobsArray.$indexFor('-KChd6xr9hAvLnea_Asq'))
    }

    return service;
}]);
