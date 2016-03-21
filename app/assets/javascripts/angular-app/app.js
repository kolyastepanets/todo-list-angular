app = angular.module('app', ['ngResource']);

app.config(['$httpProvider', function($httpProvider){
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);

app.controller('MainCtrl', ['Project', function(Project){
  var todo = this;
  this.projects = Project.query();

  this.addProject = function(){
    Project.save(this.project, function(resource){
      todo.projects.push(resource);
      todo.project = {};
    });
  };
}]);

app.factory('Project', ['$resource', function($resource){
  return $resource('/api/v1/projects/:id', { id: '@id' },
    {
      'update':  { method: 'PATCH' },
      'destroy': { method: 'DELETE' }
    }
  );
}]);
