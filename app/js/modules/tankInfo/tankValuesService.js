'use strict';

angular.module('tankInfo')

.factory('tankValuesService',
    function ($q, $rootScope, apiCalls, dataContractService, growl, _) {
        // Variables
        var dataContract = dataContractService.getDataContract();
        var playerID = $rootScope.storedID.id;

        /**
         * Get average values for requested tank
         *
         * @memberOf module:tankInfo
         * @param {Number} tankID - ID of requested tank
         * @returns {Object} average values
         */
        function getAverageTankValues(tankID) {
            var d = $q.defer();

            // Get average values
            apiCalls.getData(dataContract.tanks.stats.url + playerID + dataContract.tanks.stats.suffix + tankID).then(function(averageValues) {
                // Check if there are tank data in server response
                if (averageValues.data[playerID]) {
                    // Filter out values only for random battles
                    var avgValues = averageValues.data[playerID][0].all;

                    d.resolve({
                        avgDamage: avgValues.damage_dealt / avgValues.battles,
                        avgDef: avgValues.dropped_capture_points / avgValues.battles,
                        avgFrag: avgValues.frags / avgValues.battles,
                        avgSpot: avgValues.spotted / avgValues.battles,
                        avgWinRate: (avgValues.wins / avgValues.battles) * 100
                    });
                }
                else {
                    d.reject(false)
                }
            }).then(function(error) {
                d.reject(false)
            });

            return d.promise
        }

        /**
         * Get expected values for requested tank
         *
         * @memberOf module:tankInfo
         * @param {Number} tankID - ID of requested tank
         * @returns {Object} expected valaues
         */
        function getExpectedTankValues(tankID) {
            var d = $q.defer();

            // Get expected values
            apiCalls.getData(dataContract.expected_values).then(function(expectedValues) {
                // Filter out only requested tank
                var findTankInCollection = _.find(expectedValues.data, ['IDNum', tankID]);

                // Check if there are tank data in response
                if (findTankInCollection) {
                    d.resolve({
                        expDamage: findTankInCollection.expDamage,
                        expDef: findTankInCollection.expDef,
                        expFrag: findTankInCollection.expFrag,
                        expSpot: findTankInCollection.expSpot,
                        expWinRate: findTankInCollection.expWinRate
                    });
                }
                else {
                    d.reject(false)
                }
            }).then(function(error) {
                d.reject(false)
            });

            return d.promise
        }

        /**
         * Get average and expected values for requested tank
         * Returns object for both collections when both http requests are resolved
         *
         * @memberOf module:tankInfo
         * @param {Number} tankID - ID of requested tank
         * @returns {Object} average and expected values
         */
        function getTankValues(tankID) {
            return $q.all({ averageValues: getAverageTankValues(tankID), expectedValues: getExpectedTankValues(tankID) }).then(function(data) {
                var averageValues = data.averageValues;
                var expectedValues = data.expectedValues;

                return { averageValues: averageValues, expectedValues: expectedValues }
            });
        }

        /**
         * Get average and expected values for all tank
         * @todo Implement this function(not finished atm)
         *
         * @memberOf module:tankInfo
         * @returns {Object} average values, expected valaues
         */
        function getAllTanksValues() {
            var d1 = $q.defer();
            var d2 = $q.defer();
            var promises = [];

            // TODO: Needs to be finished

            // Get average values
            apiCalls.getData(dataContract.tanks.stats.url + playerID + dataContract.tanks.stats.suffix + tankID).then(function(averageValues) {
                console.info('loaded averageValues: ', averageValues);
                d1.resolve(averageValues);
                promises.push(d1);
            });

            // Get expected values
            apiCalls.getData(dataContract.expected_values).then(function(expectedValues) {
                console.info('loaded expectedValues: ', expectedValues);

                var find = _.find(expectedValues.data, ['IDNum', tankID]);
                console.info('loaded expectedValues - filtered: ', find);

                d2.resolve(expectedValues.data.tankID);
                promises.push(d2);
            });

            return $q.all(promises);
        }

        return {
            getAverageTankValues: getAverageTankValues,
            getExpectedTankValues: getExpectedTankValues,
            getTankValues: getTankValues,
            getAllTanksValues: getAllTanksValues
        }
});