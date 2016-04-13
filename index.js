var angular = require('angular');

var app = angular.module('app', ['ui.router']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/manage', {
      resolve: {
        'acl': ['$q', 'AclService', function ($q, AclService) {
          if (AclService.can('manage_content')) {
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    })
    .when('/content', {
      resolve: {
        'acl': ['$q', 'AclService', function ($q, AclService) {
          if (AclService.can('view_content')) {
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    });
}]);

app.run(['$rootScope', '$location', function ($rootScope, $location) {
  // If the route change failed due to our "Unauthorized" error, redirect them
  $rootScope.$on('$routeChangeError', function (current, previous, rejection) {
    if (rejection === 'Unauthorized') {
      $location.path('/');
    }
  })
}]);

// app.run(['AclService', function (AclService) {
//
//   // Set the ACL data. Normally, you'd fetch this from an API or something.
//   // The data should have the roles as the property names,
//   // with arrays listing their permissions as their value.
//   var aclData = {
//     guest: ['login'],
//     member: ['logout', 'view_content'],
//     admin: ['logout', 'view_content', 'manage_content']
//   }
//   AclService.setAbilities(aclData);
//
//   // Attach the member role to the current user
//   AclService.attachRole('member');
//
// }]);
