angular.
module('comicBookApp').
factory('pageOperations', ['$mdDialog', function ($mdDialog) {
    var ItemsPerPage = 5;
    var NumPages = 1;
    return {
        NumPages: function () { return NumPages },
        paginate: function (data, pageNum) {
            NumPages = 1;
            if (pageNum === undefined || pageNum === null || pageNum === '')
                pageNum = 1;
            var upperLim = ItemsPerPage * pageNum;
            var lowerLim = ItemsPerPage * (pageNum - 1);
            if (upperLim > data.length)
                upperLim = data.length;
            if (data.length > ItemsPerPage) {
                NumPages = Math.ceil(data.length / ItemsPerPage);
                return data.slice(lowerLim, upperLim);
            }
            else
                return data;
        },

        showAlert: function (Title, Content, parentElement, event) {
            $mdDialog.show(
                     $mdDialog.alert()
                    .parent(parentElement)
                    .clickOutsideToClose(true)
                    .title(Title)
                    .textContent(Content)
                    .ariaLabel('Alert')
                    .ok('OK')
                    .targetEvent(event)
                          );
        },

        showConfirm: function (Title, Content, event) {
            var confirm = $mdDialog.confirm()
       .title(Title)
       .textContent(Content)
       .ariaLabel('Confirm')
       .targetEvent(event)
       .ok('Yes')
       .cancel('No');
            return $mdDialog.show(confirm);
        },

    };

}]);