
angular
.module('issueList')
.component('issueList', {
    templateUrl: 'Issues/IssueList.template.html',
    controller: ['$http', function IssueListController($http) {
        var self = this;
        $http.get('http://frontendshowcase.azurewebsites.net/api/Issues').then(function (response) {
            self.Issues = response.data;
        });
    }]
});