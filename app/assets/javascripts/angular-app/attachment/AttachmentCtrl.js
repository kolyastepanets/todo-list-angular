app.controller('AttachmentCtrl', ['$scope', 'Upload', 'toastr', function ($scope, Upload, toastr) {
  $scope.getCommentId = function(comment){
    $scope.uploadFile = function(file){
      Upload.upload({
        url: 'api/v1/comments/' + $scope.comment.id + '/attachments/',
        method: 'POST',
        file: $scope.newFile
      }).success(function(data){
        comment.attachments.push(data);
        $scope.newFile = {};
        toastr.success('File successfully uploaded!');
      });
    }
  }

  $scope.showFileForm = false;

}]);
