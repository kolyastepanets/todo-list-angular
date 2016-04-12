app.controller('TaskCtrl', ['$translate', '$scope', 'taskFactory', 'toastr',
  function($translate, $scope, taskFactory, toastr){
  $scope.taskData = {};

  $scope.createTask = function(project){
    if ($scope.newData === undefined || Object.keys($scope.newData).length === 0) {
      if ($translate.use() === 'en') {
        toastr.error(I18n.translations.en.notification.task.create_error);
      } else if ($translate.use() === 'ru') {
        toastr.error(I18n.translations.ru.notification.task.create_error);
      }
    } else {
      projectId = project.id;
      taskFactory.createTask($scope.newData).success(function(data){
        $scope.project.tasks.push(data);
        $scope.newData = {};
        if ($translate.use() === 'en') {
          toastr.success(I18n.translations.en.notification.task.create);
        } else if ($translate.use() === 'ru') {
          toastr.success(I18n.translations.ru.notification.task.create);
        }
      });
    }
  };

  $scope.completeTask = function(task){
    taskId = task.id;
    taskFactory.updateTask(task)
    if ($translate.use() === 'en') {
      toastr.success(I18n.translations.en.notification.task.done);
    } else if ($translate.use() === 'ru') {
      toastr.success(I18n.translations.ru.notification.task.done);
    }
  };

  $scope.updateTitle = function(task){
    if ($scope.taskData.title === '') {
      if ($translate.use() === 'en') {
        toastr.error(I18n.translations.en.notification.task.create_error);
      } else if ($translate.use() === 'ru') {
        toastr.error(I18n.translations.ru.notification.task.create_error);
      }
      $scope.taskData.title = task.title;
    } else {
      taskId = task.id;
      taskFactory.updateTask($scope.taskData).success(function(data){
        task.title = $scope.taskData.title;
        $scope.taskData.title = {};
        if ($translate.use() === 'en') {
          toastr.success(I18n.translations.en.notification.task.updated_title);
        } else if ($translate.use() === 'ru') {
          toastr.success(I18n.translations.ru.notification.task.updated_title);
        }
        task.showEdit = !task.showEdit;
      });
    };
  };

  $scope.updateDate = function(task){
    if ($scope.taskData.end_date === undefined) {
      if ($translate.use() === 'en') {
        toastr.warning(I18n.translations.en.notification.task.no_date);
      } else if ($translate.use() === 'ru') {
        toastr.warning(I18n.translations.ru.notification.task.no_date);
      }
    } else {
      taskId = task.id;
      taskFactory.updateTask($scope.taskData).success(function(data){
        task.end_date = $scope.taskData.end_date;
        if ($translate.use() === 'en') {
          toastr.success(I18n.translations.en.notification.task.updated_date);
        } else if ($translate.use() === 'ru') {
          toastr.success(I18n.translations.ru.notification.task.updated_date);
        }
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
      if ($translate.use() === 'en') {
        toastr.warning(I18n.translations.en.notification.task.destroy_date);
      } else if ($translate.use() === 'ru') {
        toastr.warning(I18n.translations.ru.notification.task.destroy_date);
      }
    });
  };

  $scope.destroyTask = function(task){
    taskId = task.id;
    var index = $scope.project.tasks.indexOf(task)
    taskFactory.destroyTask(task).success(function(data){
      if (index !== -1){
        $scope.project.tasks.splice(index, 1);
      };
      if ($translate.use() === 'en') {
        toastr.warning(I18n.translations.en.notification.task.destroyed);
      } else if ($translate.use() === 'ru') {
        toastr.warning(I18n.translations.ru.notification.task.destroyed);
      }
    });
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.format = 'dd MMMM, yyyy';

  $scope.today = function() {
    $scope.taskData.end_date = new Date();
  };

  $scope.today();

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
