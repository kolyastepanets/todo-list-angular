app.controller('RegistrationCtrl', ['$translate', '$scope', '$state', '$auth', 'toastr',
  function($translate, $scope, $state, $auth, toastr) {
    $scope.$on('auth:registration-email-error', function(ev, reason) {
      angular.forEach(reason.errors.full_messages, function(value, key) {
        if ($translate.use() === 'en') {
          toastr.error(value);
        } else if ($translate.use() === 'ru') {
          console.log(value)
          if (value === "Password confirmation doesn't match Password") {
            toastr.error("Пароль подтверждения не совпадает с полем Пароль")
          } else if (value === "Password is too short (minimum is 8 characters)") {
            toastr.error("Пароль слишком короткий (минимум 8 букв)")
          } else if (value === "Email already in use") {
            toastr.error("Email уже используется")
          }
        }
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
          if ($translate.use() === 'en') {
            toastr.success(I18n.translations.en.notification.main.registered);
          } else if ($translate.use() === 'ru') {
            toastr.success(I18n.translations.ru.notification.main.registered);
          }
        });
    };

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };

  }
]);
