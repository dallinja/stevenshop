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
        // jobsObj.$loaded().then(function(response) {
        //     service.jobs = response;
        //     service.loading = false;
        // });

        return service;
    };
    // service.inputToggle = function() {
    //     var ref = new Firebase('https://stevenshop.firebaseio.com/jobs');
    //     var job = ref.push();
    //     job.set({'published': true});
    // }
    // {name, style, type, seg, desc, pub, imgUrls}
    service.addJob = function (newJob) {
        var ref = new Firebase('https://stevenshop.firebaseio.com/jobs');
        var job = ref.push();
        // job.set({'name': newJob});
        job.set({
            'images': {
                'img1': '/someurl.jpg'
            },
            'description': newJob.desc,
            'order': newJob.order,
            'name': newJob.name,
            'style': newJob.style,
            'type': newJob.type,
            'published': newJob.pub
        });
    };

    return service;
}]);
