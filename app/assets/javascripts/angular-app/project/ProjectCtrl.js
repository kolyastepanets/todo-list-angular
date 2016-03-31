app.controller('ProjectCtrl', ['$scope', 'Project', 'toastr', function($scope, Project, toastr){
  $scope.projects = Project.query();
  $scope.projectData = {};

  $scope.addProject = function(){
    Project.save({project: $scope.newProject}, function(resource){
      $scope.projects.push(resource);
      $scope.newProject = {};
    });
  };

  $scope.updateProject = function(project, projectData){
    if ($scope.projectData.name === '') {
      toastr.error('Project can\'t be blank.');
      projectData.name = project.name;
    }
    project.name = projectData.name;
    Project.update({id: project.id,
                    name: projectData.name}, function(resource){
      project.editProject = !project.editProject
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
