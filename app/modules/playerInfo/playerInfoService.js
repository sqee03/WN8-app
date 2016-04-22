'use strict';

angular.module('playerInfo')

.factory('playerInfoService',
    function (apiCalls, dataContractService, configService, playerIDService, $q) {

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
                            console.log('no data');
                            d.resolve('No player info found.');
                        }
                    });
                }
                else {
                    console.log('returning cached playerInfo');
                    d.resolve(cachedInfo); // Return cached data
                }
            }
            else {
                d.reject('Cannot load player info. Player ID is missing.')
            }

            return d.promise;
        };

        return {
            getPlayerInfo: getPlayerInfo
        }
});