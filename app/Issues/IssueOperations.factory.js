angular.module('comicBookApp').
factory('issueOperations', ['$http', '$window', function ($http, $window) {
    var issueUrl = 'http://frontendshowcase.azurewebsites.net/api/Issues/';
    var sharedData = {
        issueId: 0,
        issueList: [],
    };
    return {

        get: function (issueId) {
            if (issueId === undefined || issueId === null || issueId === '')
                return $http.get(issueUrl);
            else
                return $http.get(issueUrl + issueId);
        },

        getId: function () {
            return sharedData.issueId;
        },

        setId: function (issueId) {
            sharedData.issueId = issueId;
        },

        goToIssues: function () {
            $window.location.href = '#!/issues';
        },

        setIssues: function (issues) {
            sharedData.issueList = issues;
        },

        getIssues: function () {
            return sharedData.issueList;
        }
    }
}]);