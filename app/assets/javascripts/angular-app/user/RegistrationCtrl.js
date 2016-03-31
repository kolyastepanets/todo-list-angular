app.controller('RegistrationCtrl', ['$scope', '$state', '$auth', 'toastr',
  function($scope, $state, $auth, toastr) {
    $scope.$on('auth:registration-email-error', function(ev, reason) {
      angular.forEach(reason.errors.full_messages, function(value, key) {
        toastr.error(value);
      })
    });

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
    });

  }
]);
