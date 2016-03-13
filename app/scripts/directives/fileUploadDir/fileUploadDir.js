app.directive('fileUpload', function() {
	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/fileUploadDir/fileUploadDir.html',
		scope: {
            img: '='
		},
		link: function(scope, element, attr) {
			element.bind('change', function (changeEvent) {
                scope.$apply(function () {
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
            $scope.images = imageService.query();
            
            // Run service's create function
            $scope.create = function (base64String) {
                imageService.create(base64String).then(function (response) {
                    if (response) {
                        $scope.images = response;
                    } else {
                        // Upload failed error

                    }
                });
                // $('#uploadedImage').attr('src', imageService.create(base64String));
            };
        }
	};
});
