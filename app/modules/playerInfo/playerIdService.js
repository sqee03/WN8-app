'use strict';

angular.module('playerInfo')

.factory('playerIDService',
    function (apiCalls, dataContractService, configService, $q, growl) {

        console.info("- service 'playerIDService' loaded");

        // Variables
        var cachedID = null;
        var cachedName = null;

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

        function getPlayerID(name) {
            var d = $q.defer();

            if (name) {
                console.info('requesting: ', name);
                console.info('equality check - old name: ' + cachedName + ' | new name: ' + name);
                // Fetch new data only when name has been updated
                if ((name !== cachedName) || !cachedName) {
                    d.resolve(fetchID(name));
                }
                else {
                    if (cachedID) {
                        console.log('Name did not changed - returning cached id: ', cachedID);
                        d.resolve(cachedID);
                    }
                    else {
                        console.log('ID not cached, fetching new one');
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