'use strict';

angular.module('components')

.directive('progressButton',
    function () {
        /**
         * Directive for progress button
         *
         * @name progressButton directive
         */

        return {
            restrict: 'E',
            replace: true,
            // controller: 'progressButtonCtrl',
            templateUrl: 'js/components/progressButton/button.html'
        };
});