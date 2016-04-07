app.factory('commentFactory', ['$http', function($http) {
  return {
    createComment: function(commentData) {
      return $http({
        method: 'POST',
        url: '/api/v1/tasks/' + taskId + '/comments',
        params: commentData
      })
    },

    destroyComment: function(commentData) {
      return $http.delete('/api/v1/comments/' + commentId);
    }
  }
}]);
