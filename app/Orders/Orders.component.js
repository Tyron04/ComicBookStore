angular.module('orderPage', []);
angular.module('orderPage').
component('orderPage', {
    templateUrl: 'Orders/Orders.template.html',
    controller: ['$http', '$window', '$scope', 'suppliersOperations', 'issueOperations', 'pageOperations', function OrderPageController($http, $window, $scope, suppliersOperations, issueOperations, pageOperations) {
        var self = this;
        $scope.selectedIssue = 0;
        $scope.selectedSupplier = 0;
        $scope.selectedQualities = [];
        self.issues = {};
        self.suppliers = {};
        self.qualities = [
            {
                name: "veryFineQuantity",
                displayName: "Very Fine Quantity",
                quantity: 0,
            },
            {
                name: "fineQuantity",
                displayName: "Fine Quantity",
                quantity: 0,
            },

            {
                name: "goodQuantity",
                quantity: 0,
                displayName: "Good Quantity",
            },
            {
                name: "poorQuantity",
                displayName: "Poor Quantity",
                quantity: 0
            }
        ];
        self.data = {
            fineQuantity: 0,
            veryFineQuantity: 0,
            goodQuantity: 0,
            poorQuantity: 0
        };
        self.get = function () {
            suppliersOperations.get().then(function (response) {
                self.suppliers = response.data;
            });
            self.issues = issueOperations.getIssues();
            if (self.issues === undefined || self.issues.length === 0) {
                issueOperations.get().then(function (response) {
                    self.issues = response.data;
                    issueOperations.setIssues(self.issues);
                });
            }
            var id = issueOperations.getId();
            if (id !== undefined && id !== 0) {
                issueOperations.setId(0);
                $scope.selectedIssue = id.toString();

            }
        };
        self.get();

        self.order = function (ev) {
            pageOperations.showConfirm('Confirm Order', 'You are about to place an order. Is everything correct?', ev).then(function () {
                var data = '';
                for (var i = 0; i < self.qualities.length; i++) {
                    for (var key in self.data) {
                        if (self.qualities[i].name == key) {
                            self.data[key] = self.qualities[i].quantity;
                        }
                    }
                }

                $http.post('http://frontendshowcase.azurewebsites.net/api/suppliers/' + $scope.selectedSupplier + '/issues/' + $scope.selectedIssue + '/order', self.data).then(function (response) {
                    var date = new Date(response.data.shipmentDate);
                    pageOperations.showAlert('Success', 'Order successfully placed with reference: ' + response.data.shipmentReference + '. Expect delivery on ' + date.toDateString() + ' at ' + date.toTimeString(), angular.element(document.querySelector('#View')), ev);
                    self.return();
                }, function (response) {
                    pageOperations.showAlert('Error', 'Error placing order: ' + response.data.exceptionMessage, angular.element(document.querySelector('#View')), ev);
                });
            });
        };

        self.return = function () {
            issueOperations.goToIssues();
        };
    }],

});