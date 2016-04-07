app.controller('CommentCtrl', ["$scope", 'commentFactory', 'toastr', function($scope, commentFactory, toastr){
  $scope.createComment = function(task){
    if ($scope.commentData === undefined || Object.keys($scope.commentData).length === 0) {
      toastr.error('Comment can\'t be blank.');
    } else {
      taskId = task.id;
      commentFactory.createComment($scope.commentData).success(function(data){
        $scope.task.comments.push(data);
        $scope.commentData = {};
        toastr.success('Comment successfully added!');
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
      toastr.warning('Comment successfully removed!');
    });
  };
}]);

