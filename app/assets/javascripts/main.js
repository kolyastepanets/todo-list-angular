app = angular.module('app',
      ['ngResource',
       'ngAnimate',
       'ui.bootstrap',
       'ui.sortable',
       'ngFileUpload',
       'templates',
       'ui.router',
       'ng-token-auth'
       ]);

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
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

    $urlRouterProvider.otherwise("/");
  }
]);

app.run(['$auth', '$state', function($auth, $state) {
  $auth.validateUser()
    .then(function(response) {
      $state.go('');
    });
}]);