app.factory('headerService', ['$firebase', '$firebaseArray', function($firebase, $firebaseArray) {
	var service = {};

	service.getNav = function () {
        // Firebase URL
        var pagesRef = new Firebase("https://stevenshop.firebaseio.com/pages");
        var pagesObj = new $firebaseArray(pagesRef);


    	pagesObj.$loaded().then(function(response) {
            service.pages = response;
        });
    	return service;
	}
	return service;

}]);