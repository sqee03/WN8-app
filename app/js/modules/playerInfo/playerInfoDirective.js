'use strict';

angular.module('playerInfo')

.directive('playerInfo',
    function () {
        /**
         * Directive for playerInfo module
         *
         * @name playerInfo directive
         */

        return {
            restrict: 'E',
            replace: true,
            controller: 'playerInfoCtrl',
            templateUrl: 'js/modules/playerInfo/playerInfo.html'
        };
});