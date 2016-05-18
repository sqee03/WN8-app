'use strict';

angular.module('playerSearch')

.directive('playerSearch',
    function () {
        /**
         * Directive for playerSearch module
         *
         * @name playerSearch directive
         */

        return {
            restrict: 'E',
            replace: true,
            controller: 'playerSearchCtrl',
            templateUrl: 'js/modules/playerSearch/playerSearch.html'
        };
});