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
            // var d = $q.defer();
            // console.log('trying to get URL: ', dataContractService.playerSearch());

            // apiCalls.getData('https://api.worldoftanks.eu/wot/account/list/?application_id=9bd08e6ff7ffc96322e85e13cbd863c5&search=sqee03').then(function(resp) {
            //     console.log('getPlayerID returning: ', resp.data[0].account_id);
            //     d.resolve(resp.data[0].account_id);
            // });

            // return d.promise;
            return apiCalls.getData('https://api.worldoftanks.eu/wot/account/list/?application_id=9bd08e6ff7ffc96322e85e13cbd863c5&search=sqee03').then(function(resp) {
                console.log('getPlayerID returning: ', resp.data[0].account_id);
                return resp.data[0].account_id;
            });

            //console.log('url: ', dataContractService.getDataContract().then(function(url) { url.account.search }));
        };

        return {
            getPlayerID: getPlayerID
        }
});