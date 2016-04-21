'use strict';

angular.module('wotStats')

.factory('playerIDService',
    function (apiCalls, dataContractService, configService, $q) {

        console.info("- service 'playerIDService' loaded");

        // Get default player
        function getDefaultPlayer() {
            return configService.getConfig().player.name;
        }

        function getPlayerID(name) {
            var d = $q.defer();

            if (name) {
                apiCalls.getData(dataContractService.getDataContract().account.search + name).then(function(apiData) {
                    if (apiData.data[0]) {
                        d.resolve(apiData.data[0].account_id);
                    }
                    // Handle situation when there is no ID found
                    else {
                        console.log('no match');
                        d.resolve('No player found');
                    }
                })
            }
            // When player name is not defined
            else {
                d.resolve('Please define player name');
            }

            return d.promise;
        };

        return {
            getPlayerID: getPlayerID
        }
});