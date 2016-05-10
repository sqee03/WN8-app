'use strict';

angular.module('WN8')

.factory('WN8Service',
    function ($q, apiCalls, dataContractService, growl) {

        console.info("- service 'WN8Service' loaded");

        // Variables
        var wn8 = {};
        var dataContract = dataContractService.getDataContract();

        // Mocks
        var mock = {
            expected: [
                { expDmg: 380.40 },
                { expFrag: 0.52 },
                { expSpot: 3.22 },
                { expDef: 0.62 },
                { expWinRate: 52.86 }
            ],
            values: [
                { avgDmg: 380.40 },
                { avgFrag: 0.52 },
                { avgSpot: 3.22 },
                { avgDef: 0.62 },
                { avgWinRate: 52.86 }
            ],
        }

        /**
         * Get average and expected values for requested tank
         *
         * @function getTankValues
         * @param {Number} tankID - ID of requested tank
         * @returns {Object} average values, expected valaues
         */
        function getTankValues(tankID) {
            var d = $q.defer();

            // Get average values
            apiCalls.getData(dataContract.tanks.stats + playerID + dataContract.tanks.stats.suffix + tankID).then(function(averageValues) {
                d.resolve(averageValues)
            });

            // Get expected values
            apiCalls.getData(dataContractService.getDataContract().account.search + tankID).then(function(expectedValues) {
                d.resolve(averageValues)
            });

            return d.promise
        }

        /**
         * Calculate WN8 for a single tank
         *
         * @function calcTankWN8
         * @param {Array} averageValues - avgDmg, avgFrag, avgSpot, avgDef, avgWinRate
         * @param {Array} expectedValues - expDmg, expFrag, expSpot, expDef, expWinRate
         * @returns {Number} WN8 value for requested tank
         */
        function calcTankWN8(averageValues, expectedValues) {
            var d = $q.defer();

            // update variables with recieved data
            var avgDmg = avgDmg;
            var avgFrag = avgFrag;
            var avgSpot = avgSpot;
            var avgDef = avgDef;
            var avgWinRate = avgWinRate;

            // step 1
            var rDAMAGE = avgDmg     / expDmg;
            var rFRAG   = avgFrag    / expFrag;
            var rSPOT   = avgSpot    / expSpot;
            var rDEF    = avgDef     / expDef;
            var rWIN    = avgWinRate / expWinRate;
            console.debug("DONE: calcStep1 / " +rDAMAGE+ "," +rFRAG+ "," +rSPOT+ "," +rDEF+ "," +rWIN);

            // step 2
            var rDAMAGEc = $window.Math.max(0, (rDAMAGE - 0.22) / (1 - 0.22));
            var rFRAGc   = $window.Math.max(0, $window.Math.min(rDAMAGEc + 0.2, (rFRAG   - 0.12) / (1 - 0.12)));
            var rSPOTc   = $window.Math.max(0, $window.Math.min(rDAMAGEc + 0.1, (rSPOT   - 0.38) / (1 - 0.38)));
            var rDEFc    = $window.Math.max(0, $window.Math.min(rDAMAGEc + 0.1, (rDEF    - 0.10) / (1 - 0.10)));
            var rWINc    = $window.Math.max(0, (rWIN - 0.71) / (1 - 0.71));
            console.debug("DONE: calcStep2 / " +rDAMAGEc+ "," +rFRAGc+ "," +rSPOTc+ "," +rDEFc+ "," +rWINc);

            // step 3
            var wn8 = 980 * rDAMAGEc + 210 * rDAMAGEc * rFRAGc + 155 * rFRAGc*rSPOTc + 75 * rDEFc * rFRAGc + 145 * $window.Math.min(1.8,rWINc);
            var roundedWN8 = $window.Math.round(wn8 * 100) / 100;
            console.debug("DONE: calcStep3 / rounded WN8 = " + roundedWN8);

            // return roundedWN8;

            d.resolve('sample tank wn8 value');

            return d.promise
        };

        /**
         * Provide WN8 for requested tank
         *
         * @function getTankWN8
         * @param {Number} tankID - tank ID
         * @returns {Number} WN8 value for requested tank
         */
        function getTankWN8(tankID) {
            getTankValues(tankID).then(function(tankValues) {
                return calcTankWN8(getTankValues);
            })
        };

        /** setRatingColor controller */
        function setRatingColor(rating) {
            var d = $q.defer();

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
                d.resolve(wn8);
            }
            else {
                growl.error('Failed to set WN8 color. WN8 value is missing');
                d.reject(false);
            }

            return d.promise;
        };

        return {
            setRatingColor: setRatingColor,
            calcTankWN8: calcTankWN8,
            getTankWN8: getTankWN8
        }
});