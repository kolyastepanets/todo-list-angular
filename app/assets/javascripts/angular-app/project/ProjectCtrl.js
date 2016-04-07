app.controller('ProjectCtrl', ['$scope', '$window', 'projectFactory', 'toastr', function($scope, $window, projectFactory, toastr){
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
      toastr.success('Todo list added!');
    });
  };

  $scope.updateProject = function(project){
    if ($scope.projectData.name === '') {
      toastr.error('Todo list title can\'t be blank.');
      $scope.projectData.name = project.name;
    } else {
      project.name = $scope.projectData.name;
      projectFactory.updateProject(project).success(function(data){
        toastr.success('Todo list title successfully updated!');
        project.editProject = !project.editProject
      })
    }
  };

  $scope.destroyProject = function(project, index){
    var confirmation = confirm('Are you sure?');
    if (confirmation) {
      projectFactory.destroyProject(project).success(function(data){
        $scope.projects.splice(index, 1);
        toastr.warning('Todo list deleted!');
      })
    };
  };

  $scope.showEditProject = function(project) {
    $scope.projectData.name = project.name;
    project.editProject = !project.editProject;
  };

  getProjects();

}]);
