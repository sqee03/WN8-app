'use strict';

angular.module('wotStats')

.factory('dataContractService',
    function($http, $q, configService) {

        // console.info("- service 'dataContractService' loaded");

        // List of API Urls
        var dataContract = {
            'account': {}
        };

        // Get API key
        function getAPIkey() {
            return configService.getConfig().app_id.eu;
        };

        // SET data contract
        function setDataContract() {
            $http.get('json/wargamingDataContract.json').success(function(json) {
                // Base URL parts
                var url = json.api.uri + '/' + json.account.base_uri + '/';
                var apikey = json.api.key + '=' + getAPIkey();
                var account_id = json.api.account + '=';
                var search = json.api.search + '=';

                // Account search
                dataContract['account']['search'] = url + json.account.list + '/?' + apikey + '&' + search;
                // Account personal info
                dataContract['account']['info'] = url + json.account.personal_data + '/?' + apikey + '&' + account_id;
            }).error(function (error) {
                console.error('Cannot load data contract.', error);
            });
        };

        // GET data contract
        function getDataContract() {
            return dataContract;
        };

        return {
            getDataContract: getDataContract,
            setDataContract: setDataContract,
            playerSearch: function() {
                return dataContract.account.search
            },
            playerInfo: function() {
                return dataContract.account.info
            }
        };
});