(function(){
    "use strict";

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider){

        //Default Routes 
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url : '/',
            templateUrl : 'src/menuapp/views/home/home.view.html'
        })
        .state('categories', {
            url : '/categories',
            templateUrl : 'src/menuapp/views/categories/categories.view.html',
            controller : 'CategoriesController as ctrl',
            resolve : {
                items : ['MenuDataService', function(MenuDataService){
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('category', {
            url : '/categories/{categorieshortname}',
            templateUrl : 'src/menuapp/views/items/items.view.html',
            controller : 'ItemsController as ctrl',
            resolve : {
                items : ['$stateParams','MenuDataService', function($stateParams, MenuDataService){
                    return MenuDataService.getItemsForCategory($stateParams.categorieshortname);
                }]
            }
        });
    };

})()