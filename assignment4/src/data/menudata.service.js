(function(){
    "use strict";

    angular.module('data')
    .service('MenuDataService',MenuDataService);

    MenuDataService.$inject = ['$http', 'ApiBaseUrl'];
    function MenuDataService($http, ApiBaseUrl){
        var service = this;

        service.getAllCategories = function(){
            var promise = $http({
                url : (ApiBaseUrl + '/categories.json')
            })
            return promise.then(function(reponse){
                return reponse.data;
            });
        };

        service.getItemsForCategory = function(categoryShortName){
            var promise = $http({
                url : (ApiBaseUrl + '/menu_items.json'),
                params :{
                    category : categoryShortName
                }
            });
            return promise.then(function(reponse){
                return reponse.data;
            });
        };
    };
})()