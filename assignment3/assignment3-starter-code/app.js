(function(){
    'use strict';

    //Main module
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemDirective);

    //NarrowItDownController
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var controller = this;

        controller.found = []; //Items found
        controller.searchTerm = '';
        controller.message = '';

        controller.removeItem = function(index){
            controller.found.splice(index,1);
        };

        controller.searchItems = function(){
            controller.message = '';

            if(controller.searchTerm){
                MenuSearchService.getMatchedMenuItems(controller.searchTerm)
                .then(function(response){
                    controller.found = response;
                })
                .catch(function(error){
                    controller.found = [];
                    controller.message = error;
                });
            }
            else{
                controller.found = [];
                controller.message = 'Nothing found (please enter some search term).';
            }
        };
    };

    //MenuSearchService
    MenuSearchService.$inject = ['$q', '$http'];
    function MenuSearchService($q, $http){
        var service = this;

        service.getMatchedMenuItems = function(searchTerm){
            var deferred = $q.defer();
            searchTerm = searchTerm.toLowerCase();

            $http({
                url : 'https://davids-restaurant.herokuapp.com/menu_items.json'
            })
            .then(function(response){
                var foundItems = response.data.menu_items;
                var filteredFoundItems = [];
                for(var i = 0; i < foundItems.length; i++){
                    if(foundItems[i].name.toLowerCase().indexOf(searchTerm) !== -1){
                        filteredFoundItems.push(foundItems[i]);
                    }
                }
                if(filteredFoundItems.length){
                    deferred.resolve(filteredFoundItems);
                }
                else{
                    deferred.reject("Nothing found (no item match).");
                }
            })
            .catch(function(error){
                deferred.reject("Nothing found (can't contact menu provider).");
            });

            return deferred.promise;
        };
    };

    //FoundItemDirective
    function FoundItemDirective(){
        var ddo = {
            restrict : 'E',
            templateUrl : 'foundItem.html',
            scope:{
                foundItems : '<',
                onRemove : '&'
            },
            controller : FoundItemDirectiveController,
            controllerAs : 'ctrl',
            bindToController: true
        };

        return ddo;
    };

    //FoundItemDirectiveController
    function FoundItemDirectiveController(){
        var controller = this;
    };

})()