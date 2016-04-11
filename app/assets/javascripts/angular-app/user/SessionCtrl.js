app.controller('SessionCtrl', ['$translate', '$scope', '$state', '$auth', 'toastr',
  function($translate, $scope, $state, $auth, toastr){
    $scope.$on('auth:login-success', function() {
      $state.go('/');
      if ($translate.use() === 'en') {
        toastr.success(I18n.translations.en.notification.main.signed_in);
      } else if ($translate.use() === 'ru') {
        toastr.success(I18n.translations.ru.notification.main.signed_in);
      }
      });

    $scope.$on('auth:login-error', function(ev, reason) {
      if ($translate.use() === 'en') {
        toastr.error(I18n.translations.en.devise_token_auth.sessions.bad_credentials);
      } else if ($translate.use() === 'ru') {
        toastr.error(I18n.translations.ru.devise_token_auth.sessions.bad_credentials);
      }
    });

    $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) {
          $state.go('sign_in');
          if ($translate.use() === 'en') {
            toastr.success(I18n.translations.en.notification.main.signed_out);
          } else if ($translate.use() === 'ru') {
            toastr.success(I18n.translations.ru.notification.main.signed_out);
          }
        });
    };

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };

  }
]);
