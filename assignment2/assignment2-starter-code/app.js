(function(){
    "use strict";

    var startShoppingList = [
        {name : "Chocolate Cookie", quantity : "1"},
        {name : "Milk Chocolate Cookies", quantity : "8"},
        {name : "White Chocolate Cookie", quantity : "1"},
        {name : "Nut Chocolate Cookies", quantity : "5"},
        {name : "Dark Chocolate Cookies", quantity : "80"}
    ];

    // Main angular module.
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    //To Buy controller
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var toBuy = this;

        this.itemList = ShoppingListCheckOffService.toBuy;

        this.buyItem = function(itemIndex){
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    };

    //Bought controller
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var alreadyBought = this;

        this.itemList = ShoppingListCheckOffService.alreadyBought;
    };

    //Shopping list check off service
    function ShoppingListCheckOffService(){
        var service = this;

        service.toBuy = startShoppingList;
        service.alreadyBought = [];

        service.buyItem = function(itemIndex){
            var selectedItem = service.toBuy[itemIndex];
            service.alreadyBought.push(selectedItem);
            service.toBuy.splice(itemIndex,1);
        };
    };

})()