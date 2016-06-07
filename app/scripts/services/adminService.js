app.factory('adminService', ['$firebase', '$firebaseArray', '$q', function($firebase, $firebaseArray, $q) {
    var service = {};

    // Loading
	service.loading = true;

    service.query = function () {
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
                    service.jobs[job].imagesLength = Object.keys(service.jobs[job].images).length;
                }
            }
            // a temporary quick way to sort the jobs on the admin page
            for (var job in service.jobs) {
                switch (service.jobs[job].type) {
                    case 'Kitchens':
                        service.jobs[job].segOrder = 10;
                        break;
                    case 'Bathrooms':
                        service.jobs[job].segOrder = 11;
                        break;
                    case 'Home Offices':
                        service.jobs[job].segOrder = 12;
                        break;
                    case 'Entertainment Centers':
                        service.jobs[job].segOrder = 13;
                        break;
                    case 'Residential':
                        service.jobs[job].segOrder = 20;
                        break;
                    case 'Barns and Shops':
                        service.jobs[job].segOrder = 21;
                        break;
                    case 'Other':
                        service.jobs[job].segOrder = 22;
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
        }

        return service;
    };

    return service;
}]);
