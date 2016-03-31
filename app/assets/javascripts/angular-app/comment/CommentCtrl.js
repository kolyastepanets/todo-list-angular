app.controller('CommentCtrl', ["$scope", 'Comment', 'toastr', function($scope, Comment, toastr){
  $scope.addComment = function(task){
    if ($scope.newComment === undefined) {
      toastr.error('Comment can\'t be blank.');
    }
    comment = Comment.save({content: $scope.newComment.content, task_id: task.id});
      if (comment.content !== undefined) {
        $scope.task.comments.push(comment);
        $scope.newComment = {};
        console.log(comment);
      }
  };

  $scope.delComment = function(comment, task){
    var index = task.comments.indexOf(comment)
    Comment.remove({id: comment.id, task_id: task.id}, function(resource){
      if (index !== -1){
        task.comments.splice(index, 1);
      };
    });
  };

}]);
