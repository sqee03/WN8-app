'use strict';

angular.module('playerId')

.factory('playerIDService',
    function (apiCalls, dataContractService, configService, $q, $rootScope, growl) {
        // Variables
        $rootScope.storedID = null;

        /**
         * Fetching player ID from server and storing it
         *
         * @function fetchID
         * @param {string} name - Name of player (min 3 letters)
         * @returns {Number} ID for requested player name
         */
        function fetchID(name) {
            var d = $q.defer();

            apiCalls.getData(dataContractService.getDataContract().account.search + name).then(function(apiData) {
                $rootScope.storedID = {};

                // When server send error response
                if (apiData.status === 'error') {
                    $rootScope.storedID['id'] = null;
                    growl.error('Server responded with error');
                    d.reject(false)
                }
                // Check if we have data from API
                if (apiData.data[0]) {
                    $rootScope.storedID['name'] = name; // Cache player name
                    $rootScope.storedID['id'] = apiData.data[0].account_id; // Cache player ID
                    d.resolve(apiData.data[0].account_id);
                }
                // Handle situation when there is no ID found
                else {
                    $rootScope.storedID['name'] = name; // Cache player name
                    $rootScope.storedID['id'] = null; // Reset cached player ID
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
            if ($rootScope.storedID) {
                // if ($rootScope.storedID.name && !name && $rootScope.storedID.id) {
                //     d.resolve($rootScope.storedID.id);
                // }
                if (name) {
                    // Fetch new data only when name has been updated
                    if ((name !== $rootScope.storedID.name) || !$rootScope.storedID.name) {
                        d.resolve(fetchID(name));
                    }
                    else {
                        if ($rootScope.storedID.id) { // Return cached ID if name did not changed
                            d.resolve($rootScope.storedID.id);
                        }
                    }
                }
                // When player name is not defined
                else {
                    d.reject(false);
                }
            }
            else { // Fetch ID because there is no cache yet
                d.resolve(fetchID(name));
            }

            return d.promise;
        };

        return {
            getPlayerID: getPlayerID
        }
});