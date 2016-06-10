'use strict';

angular.module('filters')

.filter('roundTo',
    function($filter) {
        /**
         * Rounds number up to X decimal places
         *
         * @memberOf module:filters
         * @param {Number} number to round
         * @param {Number} number of decimal places
         * @returns {Number} rounded number
         */
        return function(input, numberOfDecimals) {
            if (!numberOfDecimals) {
                numberOfDecimals = 0;
            }
            return $filter('number')(input, numberOfDecimals);
        };
});