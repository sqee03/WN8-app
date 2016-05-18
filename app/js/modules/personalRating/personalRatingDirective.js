'use strict';

angular.module('personalRating')

.directive('personalRating',
    function () {
        /**
         * Directive for personalRating module
         *
         * @name personalRating directive
         */

        return {
            restrict: 'E',
            replace: true,
            controller: 'personalRatingCtrl',
            templateUrl: 'js/modules/personalRating/personalRating.html'
        };
});