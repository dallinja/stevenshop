app.directive('fileUpload', function() {
	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/fileUploadDir/fileUploadDir.html',
		scope: {
            images: '=',
			currentJobId: '=',
			state: '=',
			job: '='
		},
		link: function(scope, element, attr) {
			// When something is uploaded
			element.bind('change', function (changeEvent) {
                scope.$apply(function () {
					// Add uploading img gif
					scope.addTempImg();

                    // Get file from DOM
                    var file = changeEvent.target.files[0];

					// Encode
					var reader = new FileReader();

                    // When encoding is done
					reader.onload = function(readerEvt) {
						var binaryString = btoa(readerEvt.target.result);
						var base64String = 'data:image/png;base64,' + binaryString;

                        // Upload base64 encoding string
                        scope.create(base64String);
					};

                    // Call encoding process
					reader.readAsBinaryString(file);
                });
            });
		},
        controller: function ($scope, imageService) {
            // Load all images at initialization
            // $scope.images = imageService.query();

			// Initialize images array
			$scope.images = [];
			// $scope.initImages = function () {
			// 	for (img in job.images) {
			// 		$scope.images.push(img);
			// 	}
			// }

            // Run service's create function
            $scope.create = function (base64String) {
                imageService.create(base64String, $scope.currentJobId).then(
					function (response) {
	                    if (response) {
							// Upload succesfull
							// Remove temporary loading gif and add real image
							// $scope.job.images.pop();
							delete $scope.job.images.temp;
							// console.log(response);
							// $scope.job.images.push(response);
							if ($scope.state === 'create') {
		                        $scope.job.images.asdf = {};
		                        $scope.job.images.asdf.base64String = response;
		                    }
	                    } else {
	                        // Upload failed error
	                    }
                	});
            };

			// Add temporary loading image to array
			$scope.addTempImg = function () {
				console.log($scope.job.images);
				// $scope.job.images.push('images/loading.gif');
				$scope.job.images.temp = {};
				$scope.job.images.temp.base64String ='images/loading.gif';
			};
        }
	};
});
