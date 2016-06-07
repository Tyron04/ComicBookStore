angular.module('supplierDetail').
component('supplierDetail', {
    templateUrl: 'Suppliers/SupplierDetail.template.html',
    controller: ['$http', '$routeParams', '$window', function SupplierDetailController($http, $routeParams, $window) {
        var self = this;
        self.supplierURL = 'http://frontendshowcase.azurewebsites.net/api/Suppliers/';
        $http.get(self.supplierURL + $routeParams.supplierId).then(function (response) {
            self.supplierRecord = response.data;
        });

        self.update = function () {
            var data = self.supplierRecord;
            $http.post(self.supplierURL, data).then(function (response) {
                $window.alert('Supplier saved successfully');
                self.return();
            }, function (response) {
                $window.alert('Error modifying supplier. Error: ' + response.data);

            });
        };
        self.return = function () {
            $window.location.href = '#!/suppliers';
        };

    }]

});