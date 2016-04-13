'use strict';

angular.module('wotStats')

.factory('playerService',
    function (apiCalls, dataContractService, configService, $q) {

        // console.info("- service 'playerIDService' loaded");

        /**
         * Get player ID
         */
        function getPlayerID(playerName) {
            // If there is no playerName param sent, use default one from config file
            if (!playerName) {
                playerName = getDefaultPlayer();
            }

            var d = $q.defer();

            apiCalls.getData(dataContractService.getDataContract().account.search + playerName).then(function(resp) {
                d.resolve(resp.data[0].account_id);
            });

            return d.promise
        };

        /**
         * Get default player name(from config)
         */
        function getDefaultPlayer() {
            return configService.getConfig().player.name;
        };

        /**
         * Get player rating
         */
        function getPlayerRating(playerID) {
            var d = $q.defer();

            console.log('fetching rating for ID: ', playerID);

            apiCalls.getData(dataContractService.getDataContract().account.info + playerID).then(function(resp) {
                console.log('rating: ', resp.data[playerID].global_rating);
                d.resolve(resp.data[playerID].global_rating);
            });

            return d.promise
        };

        return {
            getPlayerID: getPlayerID,
            getPlayerRating: getPlayerRating
        }
});