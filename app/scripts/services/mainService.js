app.factory('mainService', ['$firebase', '$firebaseArray', '$q', function($firebase, $firebaseArray, $q) {
    var service = {};

    // Firebase ref
    var jobsRef = new Firebase("https://stevenshop.firebaseio.com/jobs");
    var pagesRef = new Firebase("https://stevenshop.firebaseio.com/pages");

    // Loading
    service.loading = true;

    service.query = function (path) {
        var index;
        if (path.indexOf('cabinetry') != -1) {
            index = 0;
        } else if (path.indexOf('construction') != -1){
            index = 1;
        }
        // var key = ref.key();
        var jobsObj = new $firebaseArray(jobsRef);
        var pagesObj = new $firebaseArray(pagesRef);
        var deferred = $q.defer();

        // On complete
        var getAllData = function () {
            var getJobs = jobsObj.$loaded();
            var getPages = pagesObj.$loaded();
            return $q.all([getJobs, getPages]);
        }

        // assigns jobs and pages objects to service obj
        getAllData().then(function (response) { 
            service.jobs = response[0];
            service.pages = response[1];
            service.loading = false;
            createJobArray(service.pages, service.jobs);
        })

        // grabs the categories for a page and adds the jobs that belong there to an array
        function createJobArray(pages, jobs) { 
            service.page = [];
            for (var segment in pages[index].categories) {
                var seg = [];
                for (var job in jobs) {
                    if (jobs[job].type === pages[index].categories[segment].name) {
                        seg[jobs[job].order - 1] = jobs[job];
                    };
                }
                service.page.push(seg)
            };
        }

        return service;
    };

    return service;
}]);
