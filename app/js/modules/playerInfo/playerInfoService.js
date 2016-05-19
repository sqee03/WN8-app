'use strict';

angular.module('playerInfo')

.factory('playerInfoService',
    function (apiCalls, dataContractService, configService, playerIDService, $q, growl) {
        // Variables
        var cachedInfo;
        var cachedID;

        /**
         * Get player info
         *
         * @memberOf module:playerInfo
         * @param {Number} id - player id
         * @returns {Obejct} player info
         */
        function getPlayerInfo(id) {
            var d = $q.defer();

            if (id) {
                // Check if data are already cached
                if(!cachedInfo || (id !== cachedID)) {
                    cachedID = id; // Cache ID

                    // Fetch new data
                    apiCalls.getData(dataContractService.getDataContract().account.info + id).then(function(apiData) {
                        if (apiData) {
                            cachedInfo = apiData.data[id]; // Cache response
                            d.resolve(apiData.data[id]);
                        }
                        // Handle situation when there is no ID found
                        else {
                            growl.error('No player info found');
                            d.reject(false);
                        }
                    });
                }
                else {
                    console.log('returning cached playerInfo');
                    d.resolve(cachedInfo); // Return cached data
                }
            }
            else {
                growl.error('Cannot load player info. Player ID is missing');
                d.reject(false)
            }

            return d.promise;
        };

        return {
            getPlayerInfo: getPlayerInfo
        }
});