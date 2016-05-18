'use strict';

angular.module('WN8')

.factory('WN8Service',
    function ($q, $rootScope, $window, apiCalls, dataContractService, playerIDService, growl, _) {
        // Variables
        var dataContract = dataContractService.getDataContract();
        var playerID = $rootScope.storedID.id;

        /**
         * Calculate WN8 for a single tank
         *
         * @function calcTankWN8
         * @param {Object} averageValues - avgDamage, avgFrag, avgSpot, avgDef, avgWinRate
         * @param {Object} expectedValues - expDamage, expFrag, expSpot, expDef, expWinRate
         * @returns {Number} WN8 value for requested tank
         */
        function calcTankWN8(averageValues, expectedValues) {
            console.log('about to calc wn8: ', averageValues, expectedValues);

            var d = $q.defer();

            // step 1
            var rDAMAGE = ($window.Math.round(averageValues.avgDamage*100)/100) / expectedValues.expDamage;
            var rFRAG = ($window.Math.round(averageValues.avgFrag*100)/100) / expectedValues.expFrag;
            var rSPOT = ($window.Math.round(averageValues.avgSpot*100)/100) / expectedValues.expSpot;
            var rDEF = ($window.Math.round(averageValues.avgDef*100)/100) / expectedValues.expDef;
            var rWIN = ($window.Math.round(averageValues.avgWinRate*100)/100) / expectedValues.expWinRate;
            console.debug("DONE: calcStep1 / " +rDAMAGE+ "," +rFRAG+ "," +rSPOT+ "," +rDEF+ "," +rWIN);

            // step 2
            var rDAMAGEc = $window.Math.max(0, (rDAMAGE - 0.22) / (1 - 0.22));
            var rFRAGc = $window.Math.max(0, $window.Math.min(rDAMAGEc + 0.2, (rFRAG - 0.12) / (1 - 0.12)));
            var rSPOTc = $window.Math.max(0, $window.Math.min(rDAMAGEc + 0.1, (rSPOT - 0.38) / (1 - 0.38)));
            var rDEFc = $window.Math.max(0, $window.Math.min(rDAMAGEc + 0.1, (rDEF - 0.10) / (1 - 0.10)));
            var rWINc = $window.Math.max(0, (rWIN - 0.71) / (1 - 0.71));
            console.debug("DONE: calcStep2 / " +rDAMAGEc+ "," +rFRAGc+ "," +rSPOTc+ "," +rDEFc+ "," +rWINc);

            // step 3
            var wn8 = 980 * rDAMAGEc + 210 * rDAMAGEc * rFRAGc + 155 * rFRAGc*rSPOTc + 75 * rDEFc * rFRAGc + 145 * $window.Math.min(1.8,rWINc);
            var roundedWN8 = $window.Math.round(wn8 * 100) / 100;
            console.debug("DONE: calcStep3 / rounded WN8 = " + roundedWN8);

            d.resolve(roundedWN8);

            return d.promise
        };

        /**
         * Set color based on WN8 rating number
         *
         * @function setWN8RatingColor
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
                growl.error('Failed to set WN8 color. WN8 value is missing');
                d.reject(false);
            }

            return d.promise;
        };

        return {
            setWN8RatingColor: setWN8RatingColor,
            calcTankWN8: calcTankWN8
        }
});