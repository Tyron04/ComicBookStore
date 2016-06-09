
angular
.module('supplierList')
.component('supplierList', {
    templateUrl: 'Suppliers/SupplierList.template.html',
    controller: ['$http', '$window', '$scope', '$filter', 'suppliersOperations', 'pageOperations', function SupplierListController($http, $window, $scope, $filter, suppliersOperations, pageOperations) {
        var self = this;
        self.pages = [];
        self.AllSuppliers = {};
        self.currentPage = 1;
        self.NumPages = 1;
        self.get = function () {
            suppliersOperations.get().then(function (response) {
                self.AllSuppliers = response.data;
                self.FilterPage('', self.AllSuppliers);
            });
        };

        self.get();

        self.selectSupplier = function (supplierId, event) {
            event.stopPropagation();
            $window.location.href = '#!/suppliers/edit/' + supplierId;
        };

        self.delete = function (supplierId, ev) {
            ev.stopPropagation();
            pageOperations.showConfirm('Confirm Delete', 'You are about to delete this supplier. Are you sure?', ev).then(function () {
                suppliersOperations.deleteSupplier(supplierId).then(function (response) {
                    pageOperations.showAlert('Success', 'Supplier successfully deleted', angular.element(document.querySelector('#View')), ev);
                    self.get();
                }, function (response) {
                    pageOperations.showAlert('Error', 'Error deleting supplier. Error: ' + response.data.exceptionMessage, angular.element(document.querySelector('#View')), ev);
                });
            });
        };

        self.insert = function () {
            $window.location.href = '#!/suppliers/insert';
        };

        self.FilterPage = function (pageRequested, data) {
            var pageNum = 1;
            if (data === undefined || data === null || data === '') {
                if ($scope.searchQuery === undefined || $scope.searchQuery === '')
                    data = self.AllSuppliers;
                else
                    data = $filter('filter')(self.AllSuppliers, $scope.searchQuery);
            }
            if (pageRequested === 'previous')
                pageNum = self.currentPage - 1;
            else if (pageRequested === 'next')
                pageNum = self.currentPage + 1;
            else if (pageRequested !== undefined && pageRequested !== null && pageRequested !== '')
                pageNum = pageRequested;
            if (pageNum > self.NumPages || pageNum < 1)
                pageNum = 1;
            self.Suppliers = pageOperations.paginate(data, pageNum);
            self.NumPages = pageOperations.NumPages();
            self.pages = [];
            for (var i = 1; i <= self.NumPages; i++) {
                self.pages.push(i);
            }
        };

        $scope.$watch('searchQuery', function (newValue, oldValue) {
            if (newValue !== undefined && newValue !== oldValue && self.AllSuppliers !== undefined) {
                var filtered = $filter('filter')(self.AllSuppliers, newValue);
                self.FilterPage(1, filtered);
            }
        });
    }]
});