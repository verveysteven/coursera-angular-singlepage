(function(){
    "use strict";

    angular.module('MenuApp')
    .component('menuItems', {
        templateUrl : 'src/menuapp/components/menu-items/menu-items.template.html',
        bindings : {
            items : '<'
        }
    });
})()