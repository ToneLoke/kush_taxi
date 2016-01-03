(function() {
  angular.module('kushTaxi', ['kushFactory', 'controllers', 'appRoutes'])
    .directive('fileModel', ['$parse', function($parse) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel)
          var modelSetter = model.assign
          element.bind('change', function() {
            scope.$apply(function() {
              modelSetter(scope, element[0].files[0])
            })
          })
        }
      }
    }])
    // upload form with pics service and agreement
    .service('fileUpload', ['$http', function($http) {
      this.uploadFileToUrl = function(file, data, uploadUrl) {
        console.log('loading file')
        var fd = new FormData()
        fd.append('patient', angular.toJson(data))
        fd.append('files', file[0])
        fd.append('files', file[1])
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
          })
          .success(function() {})
          .error(function() {})
      }
    }])
}())
