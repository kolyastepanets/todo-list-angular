app = angular.module('app', ['ngResource', 'ngAnimate', 'mgcrea.ngStrap', 'angularModalService', 'ui.bootstrap']);

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

  $scope.updateTask = function(project, task){
    Task.update({project_id: project.id,
                 id: task.id,
                 title: task.title,
                 completed: task.completed,
                 end_date: task.end_date + "T03:00:00.000Z"}, function(resource){
    });
  };

  $scope.delTask = function(task, project){
    var index = project.tasks.indexOf(task)
    Task.remove({id: task.id, project_id: project.id}, function(resource){
      if (index !== -1){
        project.tasks.splice(index, 1);
      };
    });
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.format = 'dd MMMM, yyyy';

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

// app.controller('DatepickerCtrl', function ($scope) {
//   $scope.today = function() {
//     $scope.end_date = new Date();
//   };
//   $scope.today();

//   // Disable weekend selection
//   function disabled(data) {
//     var date = data.date,
//       mode = data.mode;
//     return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
//   }

//   $scope.open2 = function() {
//     $scope.popup2.opened = true;
//   };

//   $scope.setDate = function(year, month, day) {
//     $scope.end_date = new Date(year, month, day);
//   };

//   $scope.popup2 = {
//     opened: false
//   };

// });
