
angular
.module('supplierList')
.component('supplierList', {
    templateUrl: 'Suppliers/SupplierList.template.html',
    controller: ['$http', '$window', '$scope', '$filter', 'suppliersOperations', 'pageOperations', '$mdDialog', function SupplierListController($http, $window, $scope, $filter, suppliersOperations, pageOperations, $mdDialog) {
        var self = this;
        self.pages = [];
        self.AllSuppliers = {};
        self.currentPage = 1;
        self.NumPages = 1;
        self.isRedirect = false;
        self.get = function () {
            suppliersOperations.get().then(function (response) {
                self.AllSuppliers = response.data;
                self.FilterPage('', self.AllSuppliers);
                var Url = suppliersOperations.redirectUrl;
                if (Url !== undefined && Url !== '')
                    isRedirect = true;
                else
                    isRedirect = false;
            });
        };

        self.get();

        self.selectSupplier = function (supplierId) {
            var Url = suppliersOperations.redirectUrl;
            if (Url !== undefined && Url !== '') {
                suppliersOperations.setId(supplierId);
                $window.location.href = Url;
            }
            else {
                $window.location.href = '#!/suppliers/edit/' + supplierId;
            }
        };

        self.delete = function (supplierId, ev) {
            var confirm = $mdDialog.confirm()
         .title('Confirm Delete')
         .textContent('You are about to delete this supplier. Are you sure?')
         .ariaLabel('Lucky day')
         .targetEvent(ev)
         .ok('Yes')
         .cancel('No');
            $mdDialog.show(confirm).then(function () {
                suppliersOperations.deleteSupplier(supplierId).then(function (response) {
                    $window.alert('Supplier successfully deleted');
                    self.get();
                }, function (response) {
                    $window.alert('Error deleting supplier. Error: ' + response.data);

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