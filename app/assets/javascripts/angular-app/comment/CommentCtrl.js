app.controller('CommentCtrl', ['$translate',
                               "$scope",
                               'commentFactory',
                               'toastr',
  function($translate, $scope, commentFactory, toastr){
  $scope.createComment = function(task){
    if ($scope.commentData === undefined || Object.keys($scope.commentData).length === 0) {
      toastr.error('Comment can\'t be blank.');
    } else {
      taskId = task.id;
      commentFactory.createComment($scope.commentData).success(function(data){
        $scope.task.comments.push(data);
        $scope.commentData = {};
        if ($translate.use() === 'en') {
          toastr.success(I18n.translations.en.notification.comment.create);
        } else if ($translate.use() === 'ru') {
          toastr.success(I18n.translations.ru.notification.comment.create);
        }
      });
    }
  };

  $scope.destroyComment = function(comment){
    commentId = comment.id;
    var index = $scope.task.comments.indexOf(comment)
    commentFactory.destroyComment(comment).success(function(data){
      if (index !== -1){
        $scope.task.comments.splice(index, 1);
      };
      if ($translate.use() === 'en') {
        toastr.warning(I18n.translations.en.notification.comment.destroyed);
      } else if ($translate.use() === 'ru') {
        toastr.warning(I18n.translations.ru.notification.comment.destroyed);
      }
    });
  };
}]);

