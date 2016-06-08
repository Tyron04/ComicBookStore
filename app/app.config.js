
angular.
module('comicBookApp')
.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
    when('/issues', {
        template: '<issue-list></issue-list>'
    }).
    when('/issues/view/:issueId', {
        template: '<issue-detail></issue-detail>'
    }).
    when('/suppliers', {
        template: '<supplier-list></supplier-list>'
    }).
    when('/suppliers/edit/:supplierId', {
        template: '<supplier-detail></supplier-detail>'
    }).
    when('/suppliers/insert', {
        template: '<supplier-detail></supplier-detail>'
    }).
    otherwise('/issues');

}]);
