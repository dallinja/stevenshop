app.factory('adminService', ['$firebase', '$firebaseArray', '$q', function($firebase, $firebaseArray, $q) {
    var service = {};

    // Loading
	service.loading = true;

    service.query = function () {
        var deferred2 = $q.defer();
        // Firebase URL
        var jobsRef = new Firebase("https://stevenshop.firebaseio.com/jobs");
        var pagesRef = new Firebase("https://stevenshop.firebaseio.com/pages");
        // var key = ref.key();
        var jobsObj = new $firebaseArray(jobsRef);
        var pagesObj = new $firebaseArray(pagesRef);
        var deferred = $q.defer();

        // On complete
        var getAdminData = function () {
            var getJobs = jobsObj.$loaded();
            var getPages = pagesObj.$loaded();
            return $q.all([getJobs, getPages]);
        }

        getAdminData().then(function (response) {
            service.jobs = response[0];
            for (var job in service.jobs) {
                if (parseInt(job) || job == 0) {
                    if (service.jobs[job].images) {
                        service.jobs[job].imagesLength = Object.keys(service.jobs[job].images).length;
                    } else {
                        service.jobs[job].imagesLength = 0;
                    }
                }
            }
            // a temporary quick way to sort the jobs on the admin page
            var segs = [0,0,0,0,0,0,0]; // to add up the # of each segment for the move buttons
            for (var job in service.jobs) {
                switch (service.jobs[job].type) {
                    case 'Kitchens':
                        service.jobs[job].segOrder = 10;
                        segs[0]++;
                        break;
                    case 'Bathrooms':
                        service.jobs[job].segOrder = 11;
                        segs[1]++;
                        break;
                    case 'Home Offices':
                        service.jobs[job].segOrder = 12;
                        segs[2]++;
                        break;
                    case 'Entertainment Centers':
                        service.jobs[job].segOrder = 13;
                        segs[3]++;
                        break;
                    case 'Residential':
                        service.jobs[job].segOrder = 20;
                        segs[4]++;
                        break;
                    case 'Barns and Shops':
                        service.jobs[job].segOrder = 21;
                        segs[5]++;
                        break;
                    case 'Other':
                        service.jobs[job].segOrder = 22;
                        segs[6]++;
                }
            }
            for (var job in service.jobs) {
                switch (service.jobs[job].type) {
                    case 'Kitchens':
                        service.jobs[job].segLength = segs[0];
                        break;
                    case 'Bathrooms':
                        service.jobs[job].segLength = segs[1];
                        break;
                    case 'Home Offices':
                        service.jobs[job].segLength = segs[2];
                        break;
                    case 'Entertainment Centers':
                        service.jobs[job].segLength = segs[3];
                        break;
                    case 'Residential':
                        service.jobs[job].segLength = segs[4];
                        break;
                    case 'Barns and Shops':
                        service.jobs[job].segLength = segs[5];
                        break;
                    case 'Other':
                        service.jobs[job].segLength = segs[6];
                }
            }

            service.pages = response[1];
            service.loading = false;
            getSegmentList(service.pages);
        })

        function getSegmentList(pages) {
            for (var page in pages) {
                if (pages[page].type === 'List of jobs') {
                    var segmentArray = [];
                    for (var seg in pages[page].segments) {
                        segmentArray.push(pages[page].segments[seg]);
                    };
                    var list = segmentArray.toString();
                    service.pages[page].segmentsList = list;
                }
            };
            deferred2.resolve(service);
        }
        return deferred2.promise;
    };


    return service;
}]);
