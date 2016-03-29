app = angular.module('app',
      ['ngResource',
       'ngAnimate',
       'ui.bootstrap',
       'ui.sortable',
       'ngFileUpload',
       'templates',
       'ngRoute'
       ]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
      templateUrl: 'angular-app/project/projects.html',
      controller: "ProjectCtrl"
    });

    return $routeProvider.otherwise({
      redirectTo: "/"
    });
  }
]);
