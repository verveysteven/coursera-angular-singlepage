(function(){
    "use strict";

    angular.module('MenuApp')
    .component('categories', {
        templateUrl : 'src/menuapp/components/categories/categories.template.html',
        bindings : {
            items : '<'
        }
    });
})()