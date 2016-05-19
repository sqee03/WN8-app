'use strict';

angular.module('WN8')

.factory('WN8Service',
    function ($q, $rootScope, $window, apiCalls, dataContractService, playerIDService, _) {
        // Variables
        var dataContract = dataContractService.getDataContract();
        var playerID = $rootScope.storedID.id;

        /**
         * Round up values to three or two decimal places
         *
         * @private
         * @param {Number} number
         * @param {Number} number of decimal places
         * @returns {Number} rounded number
         */
        function roundUp(number, places) {
            if (places == 2) {
                return $window.Math.round(number * 100) / 100;
            }
            else {
                return $window.Math.round(number * 1000) / 1000;
            }
        };

        /**
         * Calculate WN8 for a single tank
         *
         * @memberOf module:WN8
         * @param {Object} averageValues - avgDamage, avgFrag, avgSpot, avgDef, avgWinRate
         * @param {Object} expectedValues - expDamage, expFrag, expSpot, expDef, expWinRate
         * @returns {Number} WN8 value for requested tank
         */
        function calcTankWN8(averageValues, expectedValues) {
            var d = $q.defer();

            // step 1
            var rDAMAGE = roundUp(averageValues.avgDamage) / expectedValues.expDamage;
            var rFRAG = roundUp(averageValues.avgFrag) / expectedValues.expFrag;
            var rSPOT = roundUp(averageValues.avgSpot) / expectedValues.expSpot;
            var rDEF = roundUp(averageValues.avgDef) / expectedValues.expDef;
            var rWIN = roundUp(averageValues.avgWinRate) / expectedValues.expWinRate;

            // step 2
            var rDAMAGEc = $window.Math.max(0, (rDAMAGE - 0.22) / (1 - 0.22));
            var rFRAGc = $window.Math.max(0, $window.Math.min(rDAMAGEc + 0.2, (rFRAG - 0.12) / (1 - 0.12)));
            var rSPOTc = $window.Math.max(0, $window.Math.min(rDAMAGEc + 0.1, (rSPOT - 0.38) / (1 - 0.38)));
            var rDEFc = $window.Math.max(0, $window.Math.min(rDAMAGEc + 0.1, (rDEF - 0.10) / (1 - 0.10)));
            var rWINc = $window.Math.max(0, (rWIN - 0.71) / (1 - 0.71));

            // step 3
            var wn8 = 980 * rDAMAGEc + 210 * rDAMAGEc * rFRAGc + 155 * rFRAGc*rSPOTc + 75 * rDEFc * rFRAGc + 145 * $window.Math.min(1.8,rWINc);

            // round up
            var roundedWN8 = roundUp(wn8, 2);

            d.resolve(roundedWN8);

            return d.promise
        };

        /**
         * Set color based on WN8 rating number
         *
         * @memberOf module:WN8
         * @param {Number} rating - WN8 number
         * @returns {String} color - hexadecimal color code
         */
        function setWN8RatingColor(rating) {
            var d = $q.defer();

            var wn8 = {};

            if (rating || rating == 0) {
                // Set color for rating
                switch(true) {
                    case (rating < 2000):
                        wn8['color'] = '#930D0D';
                        break;
                    case (rating < 3000):
                        wn8['color'] = '#CD3333';
                        break;
                    case (rating < 4000):
                        wn8['color'] = '#CC7A00';
                        break;
                    case (rating < 5000):
                        wn8['color'] = '#CCB800';
                        break;
                    case (rating < 6000):
                        wn8['color'] = '#849B24';
                        break;
                    case (rating < 7000):
                        wn8['color'] = '#4D7326';
                        break;
                    case (rating < 8000):
                        wn8['color'] = '#4099BF';
                        break;
                    case (rating < 9000):
                        wn8['color'] = '#3972C6';
                        break;
                    case (rating < 10000):
                        wn8['color'] = '#793DB6';
                        break;
                    default:
                        wn8['color'] = '#401070';
                };
                d.resolve(wn8.color);
            }
            else {
                d.reject(false);
            }

            return d.promise;
        };

        return {
            setWN8RatingColor: setWN8RatingColor,
            calcTankWN8: calcTankWN8
        }
});