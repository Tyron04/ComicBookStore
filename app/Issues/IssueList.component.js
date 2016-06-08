
angular
.module('issueList')
.component('issueList', {
    templateUrl: 'Issues/IssueList.template.html',
    controller: ['$http', '$window', function IssueListController($http, $window) {
        var self = this;
        $http.get('http://frontendshowcase.azurewebsites.net/api/Issues').then(function (response) {
            self.Issues = response.data;
        });

        self.viewIssue = function (issueId) {
            $window.location.href = '#!/issues/view/' + issueId;
        }
    }]
});