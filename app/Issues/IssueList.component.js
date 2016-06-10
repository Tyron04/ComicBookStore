
angular
.module('issueList')
.component('issueList', {
    templateUrl: 'Issues/IssueList.template.html',
    controller: ['$http', '$window','$scope', 'issueOperations', function IssueListController($http, $window,$scope, issueOperations) {
        var self = this;
        self.Issues = {};
        self.get = function () {
            self.Issues = issueOperations.getIssues();
            if (self.Issues === undefined || self.Issues.length === 0) {
                issueOperations.get().then(function (response) {
                    self.Issues = response.data;
                    issueOperations.setIssues(self.Issues);
                });
            }
        };
        self.get();
        self.viewIssue = function (issueId) {
            $window.location.href = '#!/issues/view/' + issueId;
        }
    }]
});