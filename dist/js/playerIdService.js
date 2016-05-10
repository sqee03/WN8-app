'use strict';

angular.module('playerInfo')

.factory('playerIDService',
    function (apiCalls, dataContractService, configService, $q, growl) {

        // console.info("- service 'playerIDService' loaded");

        // Variables
        var cachedID = null;
        var cachedName = null;

        /**
         * Fetching player ID from server
         *
         * @function fetchID
         * @param {string} name - Name of player (min 3 letters)
         * @returns {Number} ID for requested player name
         */
        function fetchID(name) {
            var d = $q.defer();

            apiCalls.getData(dataContractService.getDataContract().account.search + name).then(function(apiData) {
                // When server send error response
                if (apiData.status === 'error') {
                    cachedID = null;
                    growl.error('Server responded with error');
                    d.reject(false)
                }
                // Check if we have data from API
                if (apiData.data[0]) {
                    cachedName = name; // Cache player name
                    cachedID = apiData.data[0].account_id; // Cache player ID
                    d.resolve(apiData.data[0].account_id);
                }
                // Handle situation when there is no ID found
                else {
                    cachedName = name; // Cache player name
                    cachedID = null; // Reset cached player ID
                    growl.error('No player found');
                    d.reject(false);
                }
            })

            return d.promise
        }

        /**
         * Responsible for providing player ID based on player name
         *
         * @function playerIDService
         * @param {string} player - Name of player (min 3 letters)
         * @returns {Number} ID for requested player name
         */
        function getPlayerID(name) {
            var d = $q.defer();

            // If you want to get cached ID
            // It will return ID cache for last cached name if available
            if (cachedName && !name && cachedID) {
                d.resolve(cachedID);
            }
            if (name) {
                // Fetch new data only when name has been updated
                if ((name !== cachedName) || !cachedName) {
                    d.resolve(fetchID(name));
                }
                else {
                    if (cachedID) { // Return cached ID if name did not changed
                        d.resolve(cachedID);
                    }
                    else { // Fetch ID because there is no cache yet
                        d.resolve(fetchID(name));
                    }
                }
            }
            // When player name is not defined
            else {
                growl.warning('Please define player name');
                d.reject(false);
            }

            return d.promise;
        };

        return {
            getPlayerID: getPlayerID
        }
});