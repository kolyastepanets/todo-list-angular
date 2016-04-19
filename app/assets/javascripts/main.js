app = angular.module('app',
      ['ngResource',
       'ngAnimate',
       'ui.bootstrap',
       'ui.sortable',
       'ngFileUpload',
       'templates',
       'ui.router',
       'ng-token-auth',
       'toastr',
       'pascalprecht.translate',
       'ngCookies',
       'tmh.dynamicLocale'
       ]);

app.config(["$stateProvider", "$urlRouterProvider", "$authProvider", '$translateProvider',
    function($stateProvider, $urlRouterProvider, $authProvider, $translateProvider) {
    $urlRouterProvider.otherwise("/sign_in");

    $stateProvider
      .state("/",
        {
          url: "/",
          templateUrl: 'angular-app/project/projects.html',
          controller: "ProjectCtrl",
          resolve: {
            auth: ['$auth', '$state', function($auth, $state) {
              return $auth.validateUser()
                .catch(function(response) {
                  $state.go('sign_in');
                })
            }]
          }
        }
      )

      .state("sign_in",
        {
          url: "/sign_in",
          templateUrl: "angular-app/user/_sign_in.html",
          controller: "SessionCtrl",
          onEnter: restrictAccess
        }
      )

      .state("sign_up",
        {
          url: "/sign_up",
          templateUrl: "angular-app/user/_sign_up.html",
          controller: "RegistrationCtrl",
          onEnter: restrictAccess
        }
      );

    $authProvider.configure({
      apiUrl: ''
    })
  }
]);

restrictAccess = function($auth, $state) {
  $auth.validateUser()
    .then(function(response) {
      if (!angular.equals({}, response)) {
        $state.go('/')
      }
    })
  }

app.config(["toastrConfig", function(toastrConfig) {
  angular.extend(toastrConfig, {
    closeButton: true,
    tapToDismiss: true,
    timeOut: 15000,
    positionClass: 'toast-top-left'
  });
}]);

app.config(['$translateProvider', function($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: 'api/v1/translations/',
    suffix: '.json'
  });

  $translateProvider.useCookieStorage({
    prefix: 'api/v1/translations/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('en');
}]);

app.run(['$auth', '$state', function($auth, $state) {
  $auth.validateUser()
    .then(function(response) {
      $state.go('/');
    });
}]);

app.config(['tmhDynamicLocaleProvider', function(tmhDynamicLocaleProvider) {
  tmhDynamicLocaleProvider.localeLocationPattern("https://code.angularjs.org/1.5.3/i18n/angular-locale_{{locale}}.js");
}]);
