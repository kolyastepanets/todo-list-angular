app.controller('AttachmentCtrl', ['$translate',
                                  '$scope',
                                  'Upload',
                                  'toastr', function ($translate, $scope, Upload, toastr) {
  $scope.getCommentId = function(comment){
    $scope.uploadFile = function(file){
      Upload.upload({
        url: 'api/v1/comments/' + $scope.comment.id + '/attachments/',
        method: 'POST',
        file: $scope.newFile
      }).success(function(data){
          comment.attachments.push(data);
          $scope.newFile = {};
          if ($translate.use() === 'en') {
            toastr.success(I18n.translations.en.notification.attachment.uploaded);
          } else if ($translate.use() === 'ru') {
            toastr.success(I18n.translations.ru.notification.attachment.uploaded);
          }
          })
        .error(function(){
          if ($translate.use() === 'en') {
            toastr.warning(I18n.translations.en.notification.attachment.not_uploaded);
          } else if ($translate.use() === 'ru') {
            toastr.warning(I18n.translations.ru.notification.attachment.not_uploaded);
          }
        });
    }
  }

  $scope.showFileForm = function(comment){
    comment.fileForm = !comment.fileForm;
  };

  $scope.showEditProject = function(project) {
    $scope.projectData.name = project.name;
    project.editProject = !project.editProject;
  };

}]);
