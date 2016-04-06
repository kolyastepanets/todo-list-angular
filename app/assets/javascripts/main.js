app = angular.module('app',
      ['ngResource',
       'ngAnimate',
       'ui.bootstrap',
       'ui.sortable',
       'ngFileUpload',
       'templates',
       'ui.router',
       'ng-token-auth',
       'toastr'
       ]);

app.config(["$stateProvider", "$urlRouterProvider", "$authProvider", function($stateProvider, $urlRouterProvider, $authProvider) {
    $urlRouterProvider.otherwise("/sign_in");
    // $urlRouterProvider.when('/?access_token&code&expires_in#/', '/');

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
          controller: "SessionCtrl"
        }

      )
      .state("sign_up",
        {
          url: "/sign_up",
          templateUrl: "angular-app/user/_sign_up.html",
          controller: "RegistrationCtrl"
        }

      );


    $authProvider.configure({
      apiUrl: ''
    })
  }
]);

app.config(["toastrConfig", function(toastrConfig) {
  angular.extend(toastrConfig, {
    closeButton: true,
    tapToDismiss: true,
    timeOut: 15000,
    positionClass: 'toast-top-left'
  });
}]);

app.run(['$auth', '$state', function($auth, $state) {
  $auth.validateUser()
    .then(function(response) {
      $state.go('/');
    });
}]);
