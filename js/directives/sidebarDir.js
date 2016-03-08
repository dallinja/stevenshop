app.directive('sidebar',function() {
	return {
		restrict: 'AE',
		templateUrl: 'js/templates/sidebarDir.html',
		scope: {
			
		},
		link: function(scope, elem, attr) {
			$(document).ready(function() {
				$(window).scroll(function (event) {
				    var scroll = $(window).scrollTop();
				    console.log(scroll)

				    for (var i = 0; i < scope.jobsMenu.length; i++) {
				    	for (var j = 0; j < scope.jobsMenu[i].jobs.length; j++) {
					    	var job = scope.jobsMenu[i].jobs[j].replace(/\s+/g, '-').toLowerCase();
					    	var type = scope.jobsMenu[i].jobType.replace(/\s+/g, '-').toLowerCase();
					    	// console.log(job);
					    	if ($('#' + job).offset().top - $(document).scrollTop() < 231) {
					    		if( j > 0) {
					    			var prevJob = scope.jobsMenu[i].jobs[j - 1].replace(/\s+/g, '-').toLowerCase();
					    			$('#' + prevJob + '-tab').removeClass('current');
					    		}
					    		if( i > 0 && j === 0 ) {
					    			var last = scope.jobsMenu[i - 1].jobs.length - 1;
					    			var prevJob = scope.jobsMenu[i - 1].jobs[last].replace(/\s+/g, '-').toLowerCase();
					    			var prevType = scope.jobsMenu[i - 1].jobType.replace(/\s+/g, '-').toLowerCase();
					    			$('#' + prevJob + '-tab').removeClass('current');
					    			$('#' + prevType + '-tab').removeClass('current');
					    		}
					    		if( i < scope.jobsMenu.length && j === scope.jobsMenu[i].jobs.length - 1 ) {
					    			var nextType = scope.jobsMenu[i + 1].jobType.replace(/\s+/g, '-').toLowerCase();
					    			$('#' + nextType + '-tab').removeClass('current');
					    		}
					    		$('#' + job + '-tab').addClass('current');
					    		$('#' + type + '-tab').addClass('current');

					    	} else {
					    		$('#' + job + '-tab').removeClass('current');
					    	}
					    }
				    }

				});
			})	
		},
		controller: function($scope, dataService) {
			$scope.jobsMenu = dataService.getJobsMenu();
		}
	}
})
.filter('spaceToDash', function () {
        return function (text) {
			
			var str = text.replace(/\s+/g, '-');
			return str.toLowerCase();
        };
});