(function(){
    'use strict';

    ///////////////////////////////////////////////////////////////////////////
    /// / ! \ Empty elements are not taken into account.
    ///////////////////////////////////////////////////////////////////////////

    // Angular Main module.
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    // Angular main controller.
    LunchCheckController.$inject =['$scope'];
    function LunchCheckController($scope){
        //Message for the user, related to his lunch.
        $scope.message = '';

        //User lunch list (separated by comma).
        $scope.userLunch = '';

        //Check user lunch.
        $scope.checkLunch = function(){
            var lunchList = getCleanListFromString($scope.userLunch);

            if(lunchList.length > 3){
                $scope.message = 'Too much!';
            }
            else if(lunchList.length > 0){
                $scope.message = 'Enjoy!';
            }
            else{
                $scope.message = 'Please enter data first';
            }
        };

        //Get clean list (no empty element) from a string separate by comma.
        var getCleanListFromString = function(string){
            var list = getListFromString(string);
            var cleanList = removeEmptyElement(list);
            return cleanList;
        }

        //Get the list of element from a string separate by comma.
        var getListFromString = function(string){
            return string.split(',');
        }

        //Remove empty element of a list.
        var removeEmptyElement = function(list){
            var resultList = [];
            for(var i = 0; i < list.length; i++){
                if(list[i].trim() != ''){
                    resultList.push(list[i]);
                }
            }
            return resultList;
        };
    };
})();