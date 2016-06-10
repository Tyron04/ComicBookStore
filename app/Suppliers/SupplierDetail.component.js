angular.module('supplierDetail').
component('supplierDetail', {
    templateUrl: 'Suppliers/SupplierDetail.template.html',
    controller: ['$http', '$routeParams', '$window', 'suppliersOperations', 'pageOperations', function SupplierDetailController($http, $routeParams, $window, suppliersOperations, pageOperations) {
        var self = this;
        self.get = function () {
            if ($routeParams.supplierId !== null && $routeParams.supplierId !== '' && $routeParams.supplierId !== undefined) {
                self.edit = true;
                self.title = 'Edit Supplier';
                suppliersOperations.get($routeParams.supplierId).then(function (response) {
                    self.supplierRecord = response.data;
                });
            }
            else {
                self.title = 'Insert Supplier';
                self.supplierRecord = {};
                self.edit = false;
            }
        };
        self.get();
        self.update = function (ev) {
            var data = self.supplierRecord;
            if (!self.edit) {
                var records = [];
                suppliersOperations.get().then(function (response) {
                    records = response.data;
                    for (var i = 0; i < records.length; i++) {
                        if (records[i].id == data.id) {
                            pageOperations.showAlert('Warning', 'Supplier with ID: ' + data.id + ' already exists', angular.element(document.querySelector('#View')), ev);
                            return
                        }
                    }
                    self.put(ev);
                });
            }
            else {
                self.put(ev);
            }
        };
        self.put = function (ev) {
            self.supplierRecord.reference = self.supplierRecord.reference.toUpperCase();
            suppliersOperations.update(self.supplierRecord).then(function (response) {
                pageOperations.showAlert('Success', 'Supplier saved successfully!', angular.element(document.querySelector('#View')), ev);
                self.return();
            }, function (response) {
                pageOperations.showAlert('Error', 'Error modifying supplier. Error: ' + response.data.exceptionMessage, angular.element(document.querySelector('#View')), ev);
            });
        }
        self.return = function () {
            $window.location.href = '#!/suppliers';
        };

    }]

});