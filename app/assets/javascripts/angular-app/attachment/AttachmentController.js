app.controller('AttachmentCtrl', ['$scope', 'Upload', function ($scope, Upload) {
  $scope.getCommentId = function(comment){
    var file = $scope.newFile;
    $scope.uploadFile = function(file){
      Upload.upload({
        url: 'api/v1/comments/' + $scope.comment.id + '/attachments/',
        method: 'POST',
        file: $scope.newFile
      }).success(function(data){
        comment.attachments.push(data);
        $scope.newFile = {};
      });
    }
  }

  $scope.showFileForm = false;

}]);
