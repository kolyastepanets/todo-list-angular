app.controller('CommentCtrl', ["$scope", 'Comment', function($scope, Comment){
  $scope.addComment = function(task){
    comment = Comment.save({content: $scope.newComment.content, task_id: task.id});
      $scope.task.comments.push(comment);
      $scope.newComment = {};
      console.log(comment);
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
app.controller('CommentCtrl', ["$scope", 'Comment', function($scope, Comment){
  $scope.addComment = function(task){
    comment = Comment.save({content: $scope.newComment.content, task_id: task.id});
      $scope.task.comments.push(comment);
      $scope.newComment = {};
      console.log(comment);
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
