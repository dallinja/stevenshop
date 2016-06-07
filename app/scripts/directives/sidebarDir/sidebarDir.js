app.directive('sidebar',function() {
	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/sidebarDir/sidebarDir.html',
		scope: {

		},
		link: function(scope, elem, attr) {
			$(document).ready(function() {
				$(window).scroll(function (event) {
				    var scroll = $(window).scrollTop();
				    // console.log(scroll, scope.jobsMenu.page)


				    for (var i = 0; i < scope.jobsMenu.page.length; i++) {
				    	for (var eachJob in scope.jobsMenu.page[i]) {
					    	if (parseInt(eachJob) || eachJob == "0") {
						    	var job = scope.jobsMenu.page[i][eachJob].name.replace(/\s+/g, '-').toLowerCase();
						    	var type = scope.jobsMenu.page[i][eachJob].type.replace(/\s+/g, '-').toLowerCase();
						    	if ($('#' + job).offset().top - $(document).scrollTop() < 231) {
						    		if( parseInt(eachJob) > 0 ) {
						    			var prevJob = scope.jobsMenu.page[i][parseInt(eachJob) - 1].name.replace(/\s+/g, '-').toLowerCase();
						    			$('#' + prevJob + '-tab').removeClass('current');
						    		}
						    		if( i > 0 && parseInt(eachJob) === 0 ) {
						    			var last = Object.keys(scope.jobsMenu.page[i - 1]).length - 2; // 2 because of $$hashtag
						    			var prevJob = scope.jobsMenu.page[i - 1][last].name.replace(/\s+/g, '-').toLowerCase();
						    			var prevType = scope.jobsMenu.page[i - 1][last].type.replace(/\s+/g, '-').toLowerCase();
						    			$('#' + prevJob + '-tab').removeClass('current');
						    			$('#' + prevType + '-tab').removeClass('current');
						    		}
						    		if( i < scope.jobsMenu.page.length - 1 && parseInt(eachJob) === Object.keys(scope.jobsMenu.page[i]).length - 2 ) { // 2 because of $$hashtag
						    			var nextType = scope.jobsMenu.page[i + 1][0].type.replace(/\s+/g, '-').toLowerCase();
						    			$('#' + nextType + '-tab').removeClass('current');
						    		}
						    		$('#' + job + '-tab').addClass('current');
						    		$('#' + type + '-tab').addClass('current');

						    	} else {
						    		$('#' + job + '-tab').removeClass('current');
						    	}
						    }
					    }
				    }
				    // for (var i = 0; i < scope.jobsMenu.page.length; i++) {
				    // 	console.log('firing')
				    // 	for (var j = 0; j < scope.jobsMenu.page[i].jobs.length; j++) {
					   //  	var job = scope.jobsMenu.page[i].jobs[j].replace(/\s+/g, '-').toLowerCase();
					   //  	var type = scope.jobsMenu.page[i].jobType.replace(/\s+/g, '-').toLowerCase();
					   //  	// console.log(job);
					   //  	if ($('#' + job).offset().top - $(document).scrollTop() < 231) {
					   //  		if( j > 0) {
					   //  			var prevJob = scope.jobsMenu.page[i].jobs[j - 1].replace(/\s+/g, '-').toLowerCase();
					   //  			$('#' + prevJob + '-tab').removeClass('current');
					   //  		}
					   //  		if( i > 0 && j === 0 ) {
					   //  			var last = scope.jobsMenu.page[i - 1].jobs.length - 1;
					   //  			var prevJob = scope.jobsMenu.page[i - 1].jobs[last].replace(/\s+/g, '-').toLowerCase();
					   //  			var prevType = scope.jobsMenu.page[i - 1].jobType.replace(/\s+/g, '-').toLowerCase();
					   //  			$('#' + prevJob + '-tab').removeClass('current');
					   //  			$('#' + prevType + '-tab').removeClass('current');
					   //  		}
					   //  		if( i < scope.jobsMenu.page.length && j === scope.jobsMenu.page[i].jobs.length - 1 ) {
					   //  			var nextType = scope.jobsMenu.page[i + 1].jobType.replace(/\s+/g, '-').toLowerCase();
					   //  			$('#' + nextType + '-tab').removeClass('current');
					   //  		}
					   //  		$('#' + job + '-tab').addClass('current');
					   //  		$('#' + type + '-tab').addClass('current');

					   //  	} else {
					   //  		$('#' + job + '-tab').removeClass('current');
					   //  	}
					   //  }
				    // }

				});
			})
		},
		controller: function($scope, mainService, $location) {
			// $scope.jobsMenu = dataService.getJobsMenu();
			$scope.toggleOpen = false;
			$scope.jobsMenu = mainService.query($location.path());
			$scope.toggleMenu = function() {
				$scope.toggleOpen = !$scope.toggleOpen;
		    	$('.main-container').toggleClass('menu-open');
		    	$('.search').toggleClass('menu-open-search');
		    }
		}
	}
})
.filter('spaceToDash', function () {
        return function (text) {

			var str = text.replace(/\s+/g, '-');
			return str.toLowerCase();
        };
});
