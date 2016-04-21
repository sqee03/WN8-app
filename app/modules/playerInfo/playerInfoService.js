'use strict';

angular.module('playerInfo')

.factory('playerInfoService',
    function (apiCalls, dataContractService, configService, playerIDService, $q) {

        console.info("- service 'playerInfoService' loaded");

        // // Variables
        // var playerID = null;

        // // Get playerID ready
        // playerIDService.getPlayerID().then(function(id) {
        //     playerID = id;
        // });

        function getPlayerInfo(id) {
            var d = $q.defer();

            apiCalls.getData(dataContractService.getDataContract().account.info + id).then(function(apiData) {
                if (apiData) {
                    d.resolve(apiData);
                }
                // Handle situation when there is no ID found
                else {
                    console.log('no data');
                    d.resolve('No player info found');
                }
            })

            return d.promise;
        };

        return {
            getPlayerInfo: getPlayerInfo
        }
});