'use strict';

angular.module('personalRating')

.directive('personalRating',
    function () {

        console.info("- directive 'personal-rating' loaded");

        return {
            restrict: 'E',
            replace: true,
            controller: 'personalRatingCtrl',
            templateUrl: 'js/modules/personalRating/personalRating.html'
        };
});