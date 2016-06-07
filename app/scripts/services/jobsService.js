app.factory('jobsService', ['$firebase', '$firebaseArray', '$q', function($firebase, $firebaseArray, $q) {
    var service = {};

    // Firebase ref
    var jobsRef = new Firebase("https://stevenshop.firebaseio.com/jobs");
    var pagesRef = new Firebase("https://stevenshop.firebaseio.com/pages");

    // Loading
	service.loading = true;

    // service.query = function (path) {
    //     var index;
    //     if (path.indexOf('cabinetry') != -1) {
    //         index = 0;
    //     } else if (path.indexOf('construction') != -1){
    //         index = 1;
    //     }
    //     // var key = ref.key();
    //     var jobsObj = new $firebaseArray(jobsRef);
    //     var pagesObj = new $firebaseArray(pagesRef);
    //     var deferred = $q.defer();

    //     // On complete
    //     var getAllData = function () {
    //         var getJobs = jobsObj.$loaded();
    //         var getPages = pagesObj.$loaded();
    //         return $q.all([getJobs, getPages]);
    //     }

    //     getAllData().then(function (response) {
    //         service.jobs = response[0];
    //         service.pages = response[1];
    //         service.loading = false;
    //         createJobArray(service.pages, service.jobs);
    //     })

    //     function createJobArray(pages, jobs) {
    //         service.page = [];
    //         for (var segment in pages[index].categories) {
    //             var seg = [];
    //             for (var job in jobs) {
    //                 if (jobs[job].type === pages[index].categories[segment].name) {
    //                     seg.push(jobs[job]);
    //                 }
    //                 seg.push()
    //             }
    //             service.page.push(seg)
    //         };
    //     }

    //     return service;
    // };

    service.editJob = function (id) {
        var jobRef = new Firebase('https://stevenshop.firebaseio.com/jobs/' + id);
        service.job = jobRef;

        return service;
    }
    service.getAndSaveJob = function (job) {
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
