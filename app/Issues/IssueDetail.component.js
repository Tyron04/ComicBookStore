
angular.module('issueDetail').
component('issueDetail', {
    templateUrl: 'Issues/IssueDetail.template.html',
    controller: ['$http', '$routeParams', '$window','issueOperations', function IssueDetailController($http, $routeParams, $window, issueOperations) {
        var self = this;
        self.get = function () {
            issueOperations.get($routeParams.issueId).then(function (response) {
                self.issueRecord = response.data;
            });
        };
        self.get();
        self.return = function () {
            issueOperations.goToIssues();
        };

        self.placeOrder = function () {
            issueOperations.setId(self.issueRecord.id);
            $window.location.href = '#!/order/'
        };
    }]
});