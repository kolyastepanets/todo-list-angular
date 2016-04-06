app.controller('ProjectCtrl', ['$scope', '$window', 'Project', 'toastr', function($scope, $window, Project, toastr){
  $scope.projects = Project.query();
  $scope.projectData = {};
  $window.location.href = '/#/';

  $scope.addProject = function(){
    Project.save({project: $scope.newProject}, function(resource){
      $scope.projects.push(resource);
      $scope.newProject = {};
    });
    toastr.success('Todo list added!');
  };

  $scope.updateProject = function(project, projectData){
    if ($scope.projectData.name === '') {
      toastr.error('Todo list title can\'t be blank.');
      projectData.name = project.name;
      project.editProject = !project.editProject
    } else {
      project.name = projectData.name;
      Project.update({id: project.id,
                      name: projectData.name}, function(resource){
        project.editProject = !project.editProject
      });
      toastr.success('Todo list title successfully updated!');
    }
  };

  $scope.delProject = function(project, index){
    var confirmation = confirm('Are you sure?');

    if (confirmation) {
      Project.delete({id: project.id});
      $scope.projects.splice(index, 1);
    };
    toastr.warning('Todo list deleted!');
  };

  $scope.showEditProject = function(project) {
    $scope.projectData.name = project.name;
    project.editProject = !project.editProject;
  };

}]);
