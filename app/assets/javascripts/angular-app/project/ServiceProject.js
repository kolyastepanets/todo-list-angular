app.factory('projectFactory', ['$http', function($http) {
  return {
    getProjects: function() {
      return $http.get('/api/v1/projects');
    },

    createProject: function(projectData) {
      return $http({
        method: 'POST',
        url: '/api/v1/projects',
        params: projectData
      })
    },

    updateProject: function(projectData) {
      return $http({
        method: 'PATCH',
        url: '/api/v1/projects/' + projectData.id,
        params: projectData
      })
    },

    destroyProject: function(projectData) {
      return $http.delete('/api/v1/projects/' + projectData.id);
    }
  }
}]);
