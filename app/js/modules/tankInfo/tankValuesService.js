'use strict';

angular.module('tankInfo')

.factory('tankValuesService',
    function ($q, $rootScope, apiCalls, dataContractService, growl, _) {
        // Variables
        var dataContract = dataContractService.getDataContract();
        var playerID = $rootScope.storedID.id;

        /**
         * Get list of all played tanks with details
         *
         * @memberOf module:tankInfo
         * @returns {Object} list of tanks with detailed informations for all battles
         */
        function getListOfAllTanks() {
            var d = $q.defer();
            var tanksList = [];

            apiCalls.getData(dataContract.tanks.stats.url + playerID).then(function(listOfTanks) {
                if (listOfTanks.data[playerID] !== null) {
                    // Check every tank on list
                    _.forEach(listOfTanks.data[playerID], function(tank) {
                        // Use values from all battles
                        // TODO: Maybe for random battles I need to extend API request with extra param 'extra=random'
                        var avgValues = tank['all'];
                        var tankID = tank['tank_id'];

                        tanksList.push({
                            tankID: tankID,
                            avgDamage: avgValues.damage_dealt / avgValues.battles,
                            avgDef: avgValues.dropped_capture_points / avgValues.battles,
                            avgFrag: avgValues.frags / avgValues.battles,
                            avgSpot: avgValues.spotted / avgValues.battles,
                            avgWinRate: (avgValues.wins / avgValues.battles) * 100,
                            avgXP: avgValues.xp / avgValues.battles,
                            avgSurvived: (avgValues.survived_battles / avgValues.battles) * 100,
                            maxXP: tank.max_xp,
                            battles: avgValues.battles
                        });
                    });
                }

                d.resolve(tanksList);
            }).then(function(error) {
                d.reject(false)
            });

            return d.promise;
        }

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
         * Get list of expected values for all tanks in game
         *
         * @memberOf module:tankInfo
         * @returns {Object} expected values for all tanks
         */
        var getAllExpectedValues = function () {
            var d = $q.defer();

            apiCalls.getData(dataContract.expected_values).then(function(expectedValues) {
                d.resolve(expectedValues.data);
            }).then(function(error) {
                d.reject(false)
            });

            return d.promise;
        }

        /**
         * Get expected values for one requested tank
         *
         * @memberOf module:tankInfo
         * @param {Number} tankID - ID of requested tank
         * @returns {Object} expected values for one tank
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
         * Get detailed informations for all played tanks and expected values for every tank
         *
         * @memberOf module:tankInfo
         * @returns {Object} List of all played tanks with detailed informations from all battles, List of expected values for all tanks in game
         */
        function getAllTanksValues() {
            return $q.all({ tanksList: getListOfAllTanks(), expectedValues: getAllExpectedValues() }).then(function(promises) {
                var tanksList = promises.tanksList;
                var expectedValues = promises.expectedValues;

                return { tanksList: tanksList, expectedValues: expectedValues }
            });
        }

        return {
            getListOfAllTanks: getListOfAllTanks,
            getAverageTankValues: getAverageTankValues,
            getAllExpectedValues: getAllExpectedValues,
            getExpectedTankValues: getExpectedTankValues,
            getTankValues: getTankValues,
            getAllTanksValues: getAllTanksValues
        }
});