app = angular.module('app', ['ngResource', 'ngAnimate', 'mgcrea.ngStrap', 'angularModalService', 'ui.bootstrap', 'ui.sortable']);

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
      console.log(task);
  };

  $scope.updateTask = function(project, task){
    Task.update({project_id: project.id,
                 id: task.id,
                 title: task.title,
                 completed: task.completed,
                 end_date: task.end_date + "T03:00:00.000Z"}, function(resource){
    });
  };

  $scope.updateDate = function(project, task){
    Task.update({project_id: project.id,
                 id: task.id,
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

  $scope.sortableOptions = {
    stop: function (e, ui) {
      $scope.project.tasks.map(function(task){
        index = $scope.project.tasks.indexOf(task)
        // debugger
        Task.update({id: task.id,
                     position: index,
                     project_id: $scope.project.id})
        // console.log('updated!');
        console.log(task);
      });
    },
    axis: 'y'
  };

}]);

app.controller('CommentCtrl', ["$scope", 'Comment', function($scope, Comment){
  // $scope.task.comments = $scope.task.comments || [];

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

app.factory('Comment', ['$resource', function($resource){
  return $resource('/api/v1/tasks/:task_id/comments/:id', { task_id: '@task_id', id: '@id' },
    {
      'update':  { method: 'PATCH' },
      'destroy': { method: 'DELETE' }
    }
  );
}]);
