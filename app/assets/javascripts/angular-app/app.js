app = angular.module('app', ['ngResource', 'ngAnimate', 'mgcrea.ngStrap']);

app.config(['$httpProvider', function($httpProvider){
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);

app.controller('ProjectCtrl', ['$scope', 'Project', function($scope, Project){
  $scope.projects = Project.query();

  $scope.addProject = function(){
    Project.save({project: $scope.newProject}, function(resource){
      $scope.projects.push(resource);
      $scope.newProject = {};
    });
  };


  $scope.updateProject = function(project){
    Project.update({id: project.id, name: project.name}, function(resource){
    });
  };

  $scope.delProject = function(project, index){
    var confirmation = confirm('Are you sure?');

    if (confirmation) {
      Project.delete({id: project.id});
      $scope.projects.splice(index, 1);
    };
  };
}]);

app.controller('TaskCtrl', ["$scope", 'Task', function($scope, Task){
  $scope.project.tasks = $scope.project.tasks || [];

  $scope.addTask = function(project){
    task = Task.save({title: $scope.newTask.title, project_id: project.id});
      $scope.project.tasks.push(task);
      $scope.newTask = {};
  };

  $scope.delTask = function(id, index){
    Task.delete({id: id, project_id: $scope.project.id});
    $scope.project.tasks.splice(index, 1);
  };

  $scope.completeTask = function(project, task){
    Task.update({project_id: project.id, id: task.id}, {completed: task.completed}
  )};

}]);

app.factory('Project', ['$resource', function($resource){
  return $resource('/api/v1/projects/:id', { id: '@id' },
    {
      'update':  { method: 'PATCH' },
      'destroy': { method: 'DELETE' }
    }
  );
}]);

app.factory('Task', ['$resource', function($resource){
  return $resource('/api/v1/projects/:project_id/tasks/:id', { project_id: '@project_id', id: '@id' },
    {
      'update':  { method: 'PATCH' },
      'destroy': { method: 'DELETE' }
    }
  );
}]);
