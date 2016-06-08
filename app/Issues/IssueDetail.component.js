
angular.module('issueDetail').
component('issueDetail', {
    templateUrl: 'Issues/IssueDetail.template.html',
    controller: ['$http', '$routeParams', '$window', 'supplierOperations', function IssueDetailController($http, $routeParams, $window, supplierOperations) {
        var self = this;
        self.IssueUrl = 'http://frontendshowcase.azurewebsites.net/api/Issues/';
        self.get = function () {
            $http.get(self.IssueUrl + $routeParams.issueId).then(function (response) {
                self.issueRecord = response.data;
                var Id = supplierOperations.supplierId;
                if (Id !== undefined && Id !== '') {
                    var data = {
                        orderId: 0,
                        deliveryStatus: "Pending",
                        shipmentReference: self.guid(),
                        shipmentDate: "2016-06-08T07:19:00.899Z"
                    };
                    $http.put('http://frontendshowcase.azurewebsites.net/api/Orders/' + Id + '/issues/' + self.issueRecord.id + '/put', data).then(function (response) {

                    }, function (response) { });
                }
            });
        };
        self.get();
        self.return = function () {
            $window.location.href = '#!/issues';
        };

        self.placeOrder = function () {
            $window.alert('Select a supplier');
            supplierOperations.returnToScreen($window.location.absUrl());
        };

        self.guid = function () {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
        };

    }]
});