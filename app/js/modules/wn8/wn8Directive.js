'use strict';

angular.module('WN8')

.directive('wn8Tank',
    function () {
        /**
         * Directive for WN8 module
         *
         * @name WN8 directive
         */

        return {
            restrict: 'E',
            replace: true,
            controller: 'WN8Ctrl',
            templateUrl: 'js/modules/wn8/wn8.html'
        };
});