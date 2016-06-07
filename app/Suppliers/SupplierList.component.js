
angular
.module('supplierList')
.component('supplierList', {
    templateUrl: 'Suppliers/SupplierList.template.html',
    controller: ['$http', '$window', function SupplierListController($http, $window) {
        var self = this;
        self.supplierURL = 'http://frontendshowcase.azurewebsites.net/api/Suppliers/';
        $http.get(self.supplierURL).then(function (response) {
            self.Suppliers = response.data;
        });

        self.delete = function (supplierId) {
            if ($window.confirm('Are you sure you want to delete this supplier?')) {
                $http.delete(self.supplierURL + supplierId).then(function (response) {
                    $window.alert('Supplier successfully deleted');
                }, function (response) {
                    $window.alert('Error deleting supplier. Error: ' + response.data);

                });
            }
        };
    }]
});