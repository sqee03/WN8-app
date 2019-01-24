'use strict';

angular.module('components')

.directive('progressBar',
    function () {
        /**
         * Directive for progress bar
         *
         * @name progressBar directive
         */

        return {
            restrict: 'E',
            replace: true,
            controller: 'progressBarCtrl',
            templateUrl: 'js/components/progressBar/progressBar.html'
        };
});