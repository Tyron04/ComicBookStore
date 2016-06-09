angular
.module('comicBookApp')
.factory('suppliersOperations', ['$http', function ($http) {
    var supplierURL = 'http://frontendshowcase.azurewebsites.net/api/Suppliers/';
    var sharedData = {
        selectedSupplierId: 0,
        transferUrl: '',
    }
    return {
        get: function (supplierId) {
            if (supplierId === undefined || supplierId === null || supplierId === '')
                return $http.get(supplierURL);
            else
                return $http.get(supplierURL + supplierId);
        },

        deleteSupplier: function (supplierId) {
            return $http.delete(supplierURL + supplierId);
        },

        update: function (data) {
            return $http.put(supplierURL, data);
        },

        returnToScreen: function (url) {
            sharedData.transferUrl = url;
        },

        redirectUrl: function () {
            return sharedData.transferUrl;
        },

        supplierId: function () {
            return sharedData.selectedSupplierId
        },

        setId: function (id) {
            sharedData.selectedSupplierId = id;
        }
    }
}])