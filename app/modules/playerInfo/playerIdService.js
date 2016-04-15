'use strict';

angular.module('wotStats')

.factory('playerIDService',
    function (apiCalls, dataContractService, configService, $q) {

        console.info("- service 'playerIDService' loaded");

        // Get default player
        function getDefaultPlayer() {
            return configService.getConfig().player.name;
        }

        function getPlayerID() {
            apiCalls.getData(dataContractService.getDataContract().account.search + getDefaultPlayer()).then(function(playerID) {
                return playerID.account_id;
            })
        };

        return {
            getPlayerID: getPlayerID
        }
});