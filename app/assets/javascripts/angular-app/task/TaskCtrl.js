app.controller('TaskCtrl', ["$scope", 'Task', 'toastr', function($scope, Task, toastr){
  $scope.project.tasks = $scope.project.tasks || [];
  $scope.taskData = {};

  $scope.addTask = function(project){
    task = Task.save({title: $scope.newTask.title, project_id: project.id});
      $scope.project.tasks.push(task);
      $scope.newTask = {};
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
    toastr.success('Task updated successfully!');
  };

  $scope.updateDate = function(project, task, taskData){
    task.end_date = taskData.end_date;
    Task.update({project_id: project.id,
                 id: task.id,
                 end_date: task.end_date + "T03:00:00.000Z"}, function(resource){
    });
    task.showEdit = !task.showEdit;
    toastr.success('Date updated successfully!');
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
