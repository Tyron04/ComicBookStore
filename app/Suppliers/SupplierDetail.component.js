angular.module('supplierDetail').
component('supplierDetail', {
    templateUrl: 'Suppliers/SupplierDetail.template.html',
    controller: ['$http', '$routeParams', '$window', 'suppliersOperations','$mdDialog', function SupplierDetailController($http, $routeParams, $window, suppliersOperations, $mdDialog) {
        var self = this;
        self.get = function () {
            if ($routeParams.supplierId !== null && $routeParams.supplierId !== '' && $routeParams.supplierId !== undefined) {
                self.edit = true;
                suppliersOperations.get($routeParams.supplierId).then(function (response) {
                    self.supplierRecord = response.data;
                });
            }
            else {
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
                            $window.alert('Supplier with ID: ' + data.id + ' already exists');
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
            suppliersOperations.update(self.supplierRecord).then(function (response) {
                $window.alert('Supplier saved successfully');
                $mdDialog.show(
                         $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#View')))
                        .clickOutsideToClose(true)
                        .title('Saved Successfully')
                        .textContent('Supplier details saved successfully')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                        .targetEvent(ev)
                              );

                self.return();
            }, function (response) {
                $window.alert('Error modifying supplier. Error: ' + response.data);

            });
        }
        self.return = function () {
            $window.location.href = '#!/suppliers';
        };

    }]

});