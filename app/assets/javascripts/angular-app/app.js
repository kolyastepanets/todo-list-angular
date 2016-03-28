app = angular.module('app', ['ngResource', 'ngAnimate', 'mgcrea.ngStrap', 'angularModalService', 'ui.bootstrap', 'ui.sortable']);

app.config(['$httpProvider', function($httpProvider){
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);

app.controller('ProjectCtrl', ['$scope', 'Project', function($scope, Project){
  $scope.projects = Project.query();
  $scope.projectData = {};

  $scope.addProject = function(){
    Project.save({project: $scope.newProject}, function(resource){
      $scope.projects.push(resource);
      $scope.newProject = {};
    });
  };

  $scope.updateProject = function(project, projectData){
    project.name = projectData.name;
    Project.update({id: project.id,
                    name: projectData.name}, function(resource){
      project.editProject = !project.editProject
        console.log(projectData.name);
        console.log(project.name);
    });
  };

  $scope.delProject = function(project, index){
    var confirmation = confirm('Are you sure?');

    if (confirmation) {
      Project.delete({id: project.id});
      $scope.projects.splice(index, 1);
    };
  };

  $scope.showEditProject = function(project) {
    $scope.projectData.name = project.name;
    project.editProject = !project.editProject;
  };


}]);

app.controller('TaskCtrl', ["$scope", 'Task', function($scope, Task){
  $scope.project.tasks = $scope.project.tasks || [];
  $scope.taskData = {};

  $scope.addTask = function(project){
    task = Task.save({title: $scope.newTask.title, project_id: project.id});
      $scope.project.tasks.push(task);
      $scope.newTask = {};
      console.log(task);
  };

  $scope.updateTask = function(project, task, taskData){
    Task.update({project_id: project.id,
                 id: task.id,
                 completed: task.completed,
                 end_date: task.end_date + "T03:00:00.000Z"}, function(resource){
    });
  };

  $scope.updateTitle = function(project, task, taskData){
    task.title = taskData.title;
    Task.update({project_id: project.id,
                 id: task.id,
                 title: taskData.title});
    task.showEdit = !task.showEdit;
  };

  $scope.updateDate = function(project, task, taskData){
    task.end_date = taskData.end_date;
    Task.update({project_id: project.id,
                 id: task.id,
                 end_date: task.end_date + "T03:00:00.000Z"}, function(resource){
    });
    task.showEdit = !task.showEdit;
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
        console.log(task);
      });
    },
    axis: 'y'
  };

  $scope.showForm = function(task){
    $scope.taskData.title = task.title;
    task.showEdit = !task.showEdit;
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
      'destroy': { method: 'DELETE' }
    }
  );
}]);
