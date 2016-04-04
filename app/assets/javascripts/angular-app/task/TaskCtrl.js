app.controller('TaskCtrl', ["$scope", 'Task', 'toastr', function($scope, Task, toastr){
  $scope.project.tasks = $scope.project.tasks || [];
  $scope.taskData = {};

  $scope.addTask = function(project){
    if ($scope.newTask === undefined || Object.keys($scope.newTask).length === 0) {
      toastr.error('Task can\'t be blank.');
    } else {
      if ($scope.project.tasks.length === 0) {
        var lastIndex = 0;
        task = Task.save({title: $scope.newTask.title, project_id: project.id, position: lastIndex});
          $scope.project.tasks.push(task);
          $scope.newTask = {};
      } else {
        var lastIndex = $scope.project.tasks.lastIndexOf(task);
        lastIndex = lastIndex + 1;
        task = Task.save({title: $scope.newTask.title, project_id: project.id, position: lastIndex});
          $scope.project.tasks.push(task);
          $scope.newTask = {};
      }
    }
  };

  $scope.completeTask = function(project, task, taskData){
    Task.update({project_id: project.id,
                 id: task.id,
                 completed: task.completed
               });
      toastr.success('Task updated!');
  };

  $scope.updateTitle = function(project, task, taskData){
    if ($scope.taskData.title === '') {
      toastr.error('Task can\'t be blank.');
      taskData.title = task.title;
    } else {
      task.title = taskData.title;
      Task.update({project_id: project.id,
                   id: task.id,
                   title: taskData.title});
      toastr.success('Task updated successfully!');
      task.showEdit = !task.showEdit;
    };
  };

  $scope.updateDate = function(project, task, taskData){
    if (taskData.end_date === undefined) {
      task.showEdit = !task.showEdit;
      toastr.warning('Date didn\'t change!');
    } else {
      task.end_date = taskData.end_date;
      Task.update({project_id: project.id,
                   id: task.id,
                   end_date: task.end_date + "T03:00:00.000Z"});
      task.showEdit = !task.showEdit;
      toastr.success('Date changed successfully!');
    }
  };

  $scope.deleteDate = function(project, task){
    Task.update({project_id: project.id,
                   id: task.id,
                   end_date: null});
      task.end_date = undefined;
      task.showEdit = !task.showEdit;
      toastr.success('Date deleted successfully!');
  };

  $scope.delTask = function(task, project){
    var index = project.tasks.indexOf(task)
    Task.remove({id: task.id, project_id: project.id}, function(resource){
      if (index !== -1){
        project.tasks.splice(index, 1);
      };
    });
    toastr.success('Task deleted successfully!');
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.format = 'dd MMMM, yyyy';

  $scope.sortableOptions = {
    disabled: false,
    stop: function (e, ui) {
      $scope.project.tasks.map(function(task){
        index = $scope.project.tasks.indexOf(task)
        // debugger
        Task.update({id: task.id,
                     position: index,
                     project_id: $scope.project.id})
      });
    },
    axis: 'y'
  };

  $scope.showForm = function(task){
    $scope.taskData.title = task.title;
    task.showEdit = !task.showEdit;
    angular.forEach($scope.projects, function (eachProject) {
      angular.forEach(eachProject.tasks, function (eachTask) {
        eachTask.showEdit = false;
        if (task.showEdit === eachTask.showEdit) {
          eachTask.showEdit = true;
        }
      });
    });
  }

}]);
