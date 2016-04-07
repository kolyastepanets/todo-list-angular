app.controller('TaskCtrl', ['$scope', 'taskFactory', 'toastr', function($scope, taskFactory, toastr){
  $scope.taskData = {};

  $scope.createTask = function(project){
    if ($scope.newData === undefined || Object.keys($scope.newData).length === 0) {
      toastr.error('Task can\'t be blank.');
    } else {
      projectId = project.id;
      taskFactory.createTask($scope.newData).success(function(data){
        $scope.project.tasks.push(data);
        $scope.newData = {};
        toastr.success('Task added!');
      });
    }
  };

  $scope.completeTask = function(task){
    taskId = task.id;
    taskFactory.updateTask(task)
    toastr.success('Task updated!');
  };

  $scope.updateTitle = function(task){
    if ($scope.taskData.title === '') {
      toastr.error('Task can\'t be blank.');
      $scope.taskData.title = task.title;
    } else {
      taskId = task.id;
      taskFactory.updateTask($scope.taskData).success(function(data){
        task.title = $scope.taskData.title;
        $scope.taskData.title = {};
        toastr.success('Task updated successfully!');
        task.showEdit = !task.showEdit;
      });
    };
  };

  $scope.updateDate = function(task){
    if ($scope.taskData.end_date === undefined) {
      toastr.warning('Select date!');
    } else {
      taskId = task.id;
      taskFactory.updateTask($scope.taskData).success(function(data){
        task.end_date = $scope.taskData.end_date;
        toastr.success('Date changed successfully!');
        task.showEdit = !task.showEdit;
      });
    }
  };

  $scope.deleteDate = function(task){
    taskId = task.id;
    $scope.taskData.end_date = "";
    taskFactory.updateTask($scope.taskData).success(function(data){
      task.end_date = undefined;
      task.showEdit = !task.showEdit;
      toastr.warning('Date deleted successfully!');
    });
  };

  $scope.destroyTask = function(task){
    taskId = task.id;
    var index = $scope.project.tasks.indexOf(task)
    taskFactory.destroyTask(task).success(function(data){
      if (index !== -1){
        $scope.project.tasks.splice(index, 1);
      };
      toastr.warning('Task deleted successfully!');
    });
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
        taskId = task.id
        task.position = index
        taskFactory.updateTask(task)
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

app.directive('datepickerLocaldate', ['$parse', function ($parse) {
  var directive = {
      restrict: 'A',
      require: ['ngModel'],
      link: link
  };
  return directive;

  function link(scope, element, attr, ctrls) {
      var ngModelController = ctrls[0];

      // called with a JavaScript Date object when picked from the datepicker
      ngModelController.$parsers.push(function (viewValue) {
          // undo the timezone adjustment we did during the formatting
          viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
          // we just want a local date in ISO format
          return viewValue.toISOString().substring(0, 10);
      });

      // called with a 'yyyy-mm-dd' string to format
      ngModelController.$formatters.push(function (modelValue) {
          if (!modelValue) {
              return undefined;
          }
          // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
          var dt = new Date(modelValue);
          // 'undo' the timezone offset again (so we end up on the original date again)
          dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
          return dt;
      });
  }
}]);
