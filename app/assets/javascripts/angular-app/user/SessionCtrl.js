app.controller('SessionCtrl', ['$scope', '$state', '$auth', 'toastr',
  function($scope, $state, $auth, toastr){
    $scope.$on('auth:login-success', function() {
      $state.go('/');
      toastr.success('Signed in successfully!');
    });

    $scope.$on('auth:login-error', function(ev, reason) {
      toastr.error(reason.errors[0]);
    });

    $scope.handleSignOutBtnClick   = function() {
      $auth.signOut()
        .then(function(resp) {
          $state.go('sign_in');
          toastr.success('Signed out successfully!');
        });
    };
  }
]);
