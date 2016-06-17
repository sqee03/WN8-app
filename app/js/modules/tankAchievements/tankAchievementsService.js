'use strict';

angular.module('tankAchievemetns')

.factory('tankAchievementsService',
    function ($q, $rootScope, apiCalls, dataContractService, growl, _) {
        // Variables
        var dataContract = dataContractService.getDataContract();
        var playerID = $rootScope.storedID.id;
        var cache = [];

        /**
         * Clear cached data
         *
         * @memberOf module:tankAchievements
         */
        function clearCache() {
            cache = [];
        }

        /**
         * Get list of all played tanks and their achievements
         *
         * @memberOf module:tankAchievements
         * @returns {Array} list of tanks with detailed informations about their achievements
         */
        function getAllTanksAchievements() {
            var d = $q.defer();
            var tanksList = [];

            // Check if cached data are available
            if (cache.length > 0) {
                return cache;
            }
            // If there is no cache, fetch new data from server
            else {
                apiCalls.getData(dataContract.tanks.achievements.url + playerID).then(function(listOfTanks) {
                    if (listOfTanks.data[playerID] !== null) {
                        // Check every tank on list
                        _.forEach(listOfTanks.data[playerID], function(tank) {
                            var tankID = tank['tank_id'];

                            tanksList.push({
                                tankID: tankID,
                                achievements: tank.achievements
                            });
                        });
                    }

                    cache = tanksList; // store data into cache
                    d.resolve(tanksList);
                }).then(function(error) {
                    d.reject(false)
                });
            }

            return d.promise;
        }

        /**
         * Get Marks of excelence
         *
         * @memberOf module:tankAchievements
         * @param {Array} list of achievements
         * @returns {Array} list of tanks with MOE
         */
        function getMoeTanks(achievements) {
            var d = $q.defer();
            var moeList = [];

            // Return list of tanks with 3 MOE
            var moeTanks = _.filter(achievements, {'achievements':{'marksOnGun': 3}})

            // Filter out only tanks IDs
            _.forEach(moeTanks, function(tank) {
                var tankID = tank['tankID'];

                moeList.push({
                    tankID: tankID,
                });
            });

            d.resolve(moeList);

            return d.promise;
        }

        return {
            getAllTanksAchievements: getAllTanksAchievements,
            getMoeTanks: getMoeTanks,
            clearCache: clearCache
        }
});