app.factory('pagesService', ['$firebase', '$firebaseArray', '$q', function($firebase, $firebaseArray, $q) {
    var service = {};



	service.getPage = function (page) {
        var pagesRef = new Firebase('https://stevenshop.firebaseio.com/pages');
        var pagesArray = $firebaseArray(pagesRef);
        pagesArray.$loaded().then(function() {
            var pageObj = pagesArray.$getRecord(page.$id);
            pageObj.segments = page.segments
            jobsArray.$save(pageObj).then(function (ref) {
                console.log('Saved!!!!!!')
                console.log(ref);
            });
        })
    }
    return service;
}]);