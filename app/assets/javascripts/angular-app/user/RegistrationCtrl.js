app.controller('RegistrationCtrl', ['$scope', '$state', '$auth', 'toastr',
  function($scope, $state, $auth, toastr) {
    $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
        .then(function() {
          $auth.submitLogin({
            email: $scope.registrationForm.email,
            password: $scope.registrationForm.password
          })
          $state.go('/');
          toastr.success('Registered successfully!');
        });
    };

    $scope.$on('auth:oauth-registration', function(ev, user) {
      toastr.success('Signed in successfully with Facebook!');
    });

  }
]);
