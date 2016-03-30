app.controller('SessionCtrl', ['$scope', '$state', '$auth',
  function($scope, $state, $auth){
    $scope.$on('auth:login-success', function() {
      $state.go('/');
    });

    $scope.$on('auth:login-error', function(ev, reason) {
      $scope.error = reason.errors[0];
    });

    $scope.handleSignOutBtnClick   = function() {
      $auth.signOut()
        .then(function(resp) {
          $state.go('sign_in');
        });
    };
  }
]);
