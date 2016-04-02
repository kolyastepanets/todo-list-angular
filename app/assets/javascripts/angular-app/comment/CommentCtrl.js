app.controller('CommentCtrl', ["$scope", 'Comment', 'toastr', function($scope, Comment, toastr){
  $scope.addComment = function(task){
    if ($scope.newComment === undefined || Object.keys($scope.newComment).length === 0) {
      toastr.error('Comment can\'t be blank.');
    } else {
      comment = Comment.save({content: $scope.newComment.content, task_id: task.id});
        $scope.task.comments.push(comment);
        $scope.newComment = {};
        toastr.success('Comment successfully added!');
    }
  };

  $scope.delComment = function(comment, task){
    var index = task.comments.indexOf(comment)
    Comment.remove({id: comment.id, task_id: task.id}, function(resource){
      if (index !== -1){
        task.comments.splice(index, 1);
      };
    });
    toastr.success('Comment successfully removed!');
  };

}]);
