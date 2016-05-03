'use strict';

angular.module('playerInfo')

.factory('playerInfoService',
    function (apiCalls, dataContractService, configService, playerIDService, $q, growl) {

        console.info("- service 'playerInfoService' loaded");

        // Variables
        var cachedInfo;
        var cachedID;

        function getPlayerInfo(id) {
            var d = $q.defer();
            console.info('equality check - old id: ' + cachedID + ' | new id: ' + id);

            if (id) {
                // Check if data are already cached
                if(!cachedInfo || (id !== cachedID)) {
                    cachedID = id; // Chache ID

                    // Fetch new data
                    apiCalls.getData(dataContractService.getDataContract().account.info + id).then(function(apiData) {
                        if (apiData) {
                            cachedInfo = apiData.data[id]; // Chache response
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