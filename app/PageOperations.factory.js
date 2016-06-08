angular.
module('comicBookApp').
factory('pageOperations', [function () {
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
        }
    };

}]);