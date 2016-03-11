app.factory('adminService', ['$firebase', '$firebaseArray', function($firebase, $firebaseArray) {
    var service = {};

    // Loading
	service.loading = true;

    service.query = function () {
        // Firebase URL
        var ref = new Firebase("https://stevenshop.firebaseio.com/jobs");
        // var key = ref.key();
        var obj = new $firebaseArray(ref);

        // On complete
        obj.$loaded().then(function(response) {
            service.jobs = response;
            service.loading = false;
        });

        return service;
    };

    service.insert = function () {
        var ref = new Firebase('https://stevenshop.firebaseio.com/jobs');
        var job = ref.push();
        job.set({
            'images': {
                'img1': '/someurl.jpg'
            },
            'description': 'I made bank on this job.',
            'id': 3,
            'name': 'Just another job',
            'style': 'good style'
        });
    };

    service.delete = function (id) {
        var ref = new Firebase('https://stevenshop.firebaseio.com/jobs/' + id);
        ref.remove();
    };

    return service;
}]);
