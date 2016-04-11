app.controller('ProjectCtrl', ['$translate',
                               '$scope',
                               '$window',
                               'projectFactory',
                               'toastr',
  function($translate, $scope, $window, projectFactory, toastr){
  $scope.projectData = {};
  $window.location.href = '/#/';

  getProjects = function() {
    projectFactory.getProjects().success(function(data) {
      $scope.projects = data;
    })
  };

  $scope.createProject = function(){
    projectFactory.createProject($scope.projectData).success(function(data){
      $scope.projects.push(data);
      $scope.projectData = {};
      if ($translate.use() === 'en') {
        toastr.success(I18n.translations.en.notification.project.create);
      } else if ($translate.use() === 'ru') {
        toastr.success(I18n.translations.ru.notification.project.create);
      }
    });
  };

  $scope.updateProject = function(project){
    if ($scope.projectData.name === '') {
      if ($translate.use() === 'en') {
        toastr.error(I18n.translations.en.notification.project.create_error);
      } else if ($translate.use() === 'ru') {
        toastr.error(I18n.translations.ru.notification.project.create_error);
      }
      toastr.error('Todo list title can\'t be blank.');
      $scope.projectData.name = project.name;
    } else {
      project.name = $scope.projectData.name;
      projectFactory.updateProject(project).success(function(data){
        if ($translate.use() === 'en') {
          toastr.success(I18n.translations.en.notification.project.update);
        } else if ($translate.use() === 'ru') {
          toastr.success(I18n.translations.ru.notification.project.update);
        }
        project.editProject = !project.editProject
      })
    }
  };

  $scope.destroyProject = function(project, index){
    var confirmation = confirm('Are you sure?');
    if (confirmation) {
      projectFactory.destroyProject(project).success(function(data){
        $scope.projects.splice(index, 1);
        if ($translate.use() === 'en') {
          toastr.warning(I18n.translations.en.notification.project.destroy);
        } else if ($translate.use() === 'ru') {
          toastr.warning(I18n.translations.ru.notification.project.destroy);
        }
      })
    };
  };

  $scope.showEditProject = function(project) {
    $scope.projectData.name = project.name;
    project.editProject = !project.editProject;
  };

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };

  getProjects();

}]);
