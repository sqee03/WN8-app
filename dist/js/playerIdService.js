'use strict';

angular.module('playerInfo')

.factory('playerIDService',
    function (apiCalls, dataContractService, configService, $q) {

        console.info("- service 'playerIDService' loaded");

        // Variables
        var playerID = null;

        function getPlayerID(name) {
            var d = $q.defer();

            if (name) {
                // Return cached ID if available
                if(playerID) {
                    console.log('returning cached id: ', playerID);
                    d.resolve(playerID);
                }

                apiCalls.getData(dataContractService.getDataContract().account.search + name).then(function(apiData) {
                    // When server send error response
                    if (apiData.status === 'error') {
                        playerID = null;
                        console.error('server error');
                        d.reject('Server responded with error')
                    }
                    // Check if we have data from API
                    if (apiData.data[0]) {
                        playerID = apiData.data[0].account_id;
                        d.resolve(apiData.data[0].account_id);
                    }
                    // Handle situation when there is no ID found
                    else {
                        console.log('no match');
                        playerID = null;
                        d.resolve('No player found');
                    }
                })
            }
            // When player name is not defined
            else {
                playerID = null;
                d.resolve('Please define player name');
            }

            return d.promise;
        };

        return {
            getPlayerID: getPlayerID
        }
});