angular
.module('comicBookApp')
.factory('suppliersOperations', ['$http', function ($http) {
    var supplierURL = 'http://frontendshowcase.azurewebsites.net/api/Suppliers/';
    var selectedSupplierId = 0;
    var transferUrl = '';
    return {
        supplierURL: supplierURL,

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
            transferId = url;
        },

        redirectUrl: transferUrl,

        supplierId: selectedSupplierId,

        setId: function (id) {
            selectedSupplierId = id;
        }
    }
}])