'use strict';

angular.module('playerId')

.factory('playerIDService',
    function (apiCalls, dataContractService, configService, $q, $rootScope, growl) {
        // Variables
        $rootScope.storedID = null;

        /**
         * Fetching player ID from server and storing it
         *
         * @memberOf module:playerId
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
            }, function(error) {
                d.reject(false);
                growl.error('Failed to load player ID from server.');
            });

            return d.promise
        }

        /**
         * Responsible for providing player ID based on player name
         *
         * @memberOf module:playerId
         * @param {string} player - Name of player (min 3 letters)
         * @returns {Number} ID for requested player name
         */
        function getPlayerID(name) {
            var d = $q.defer();

            // If you want to get cached ID
            // It will return ID cache for last cached name if available
            if ($rootScope.storedID) {
                console.log('1) cache exist');
                // if ($rootScope.storedID.name && !name && $rootScope.storedID.id) {
                //     d.resolve($rootScope.storedID.id);
                // }
                if (name) {
                    console.log('2) name is defined');
                    // Fetch new data only when name has been updated
                    if ((name !== $rootScope.storedID.name) || !$rootScope.storedID.name) {
                        console.log('3) new name - fetching ID');
                        d.resolve(fetchID(name));
                    }
                    else {
                        if ($rootScope.storedID.id) { // Return cached ID if it is stored
                            console.log('3) old name - returning cache');
                            d.resolve($rootScope.storedID.id);
                        }
                        else { // Fetch ID again
                            console.log('3) old name - ID is not stored, fetching it');
                            d.resolve(fetchID(name));
                        }
                    }
                }
                // When player name is not defined
                else {
                    d.reject(false);
                }
            }
            else { // Fetch ID because there is no cache yet
                console.log('0) cache does not exist yet');
                d.resolve(fetchID(name));
            }

            return d.promise;
        };

        return {
            getPlayerID: getPlayerID
        }
});