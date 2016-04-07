app.factory('taskFactory', ['$http', function($http) {
  return {
    createTask: function(newData) {
      return $http({
        method: 'POST',
        url: '/api/v1/projects/' + projectId + '/tasks',
        params: newData
      })
    },

    updateTask: function(taskData) {
      console.log(taskData);
      return $http({
        method: 'PATCH',
        url: '/api/v1/tasks/' + taskId,
        params: taskData
      })
    },

    destroyTask: function(taskData) {
      return $http.delete('/api/v1/tasks/' + taskId);
    }
  }
}]);
