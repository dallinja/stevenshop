app.controller('MainCtrl',['$scope', 'mainService', 'jobsService', '$location', function($scope, mainService, jobsService, $location) {

	// Set loading gif
	$scope.data = {
		loading: true
	};

	// Get jobs
    $scope.data = mainService.query($location.path());

    // Carousel
    $scope.setCarousel = function(id, index) {
    	$('#' + id.toLowerCase() + '-carousel').carousel(index);
    	$('#' + id.toLowerCase() +' .thumbs-div.current').removeClass('current');
    	$('#' + id.toLowerCase() + index).parent().addClass('current');
    }

	// Footer

}])
.filter('spaceToDash', function () {
        return function (text) {

			var str = text.replace(/\s+/g, '-');
			return str.toLowerCase();
        };
});
