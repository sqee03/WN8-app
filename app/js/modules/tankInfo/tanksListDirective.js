'use strict';

angular.module('tankInfo')

.directive('tanksList',
    function () {
        /**
         * Directive for tanks list
         *
         * @name tanksList directive
         */

        return {
            restrict: 'E',
            replace: true,
            controller: 'tanksListCtrl',
            templateUrl: 'js/modules/tankInfo/tanksList.html'
        };
});