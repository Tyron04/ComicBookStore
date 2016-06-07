angular.module('comicBookApp', ['ngRoute', 'issueList', 'supplierList', 'supplierDetail']);

angular.
module('comicBookApp')
.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/issues', {
        template: '<issue-list></issue-list>'
    }).
    when('/suppliers', {
        template: '<supplier-list></supplier-list>'
    }).
        when('/suppliers/edit/:supplierId', {
              template: '<supplier-detail></supplier-detail>'
          }).
    otherwise('/issues');

}]);
