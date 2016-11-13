(function(){
    "use strict";

    angular.module('MenuApp')
    .component('routerStatus', {
        templateUrl : 'src/menuapp/components/router-status/router-status.template.html',
        controller : RouterStatusComponentController
    });

    RouterStatusComponentController.$inject = ['$rootScope'];
    function RouterStatusComponentController($rootScope){
        var controller = this;
        controller.loading = false;

        $rootScope.$on('$stateChangeStart', 
            function(event, toState, toParams, fromState, fromParams, options){
            //console.log("Change start");
            controller.loading = true;
        });

        $rootScope.$on('$stateChangeSuccess', 
            function(event, toState, toParams, fromState, fromParams){
            //console.log("Change success");
            controller.loading = false;
        });

        $rootScope.$on('$stateChangeError', 
            function(event, toState, toParams, fromState, fromParams, error){
            //console.log("Change error", error);
            controller.loading = false;
        });
    };
})()