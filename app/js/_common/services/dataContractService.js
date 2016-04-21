'use strict';

angular.module('wotStats')

.factory('dataContractService',
    function($http, configService) {

        console.info("- service 'dataContractService' loaded");

        // List of API Urls
        var dataContract = {
            'account': {}
        };

        // Get API key
        function getAPIkey() {
            return configService.getConfig().app_id.eu;
        };

        // Get type of search from config
        // 'Exact' - exact match, 'Startswidth' - search by initial characters
        function getSearchType() {
            return configService.getConfig().player.searchType;
        };

        // SET data contract
        function setDataContract() {
            $http.get('json/wargamingDataContract.json').success(function(json) {
                // Base URL parts
                var url = json.api.uri + '/' + json.account.base_uri + '/';
                var apikey = json.api.key + '=' + getAPIkey();
                var account_id = json.api.account + '=';
                var search = json.api.search.key + '=';
                var searchType = json.api.search.type + '=' + getSearchType();

                // Account search
                dataContract['account']['search'] = url + json.account.list + '/?' + apikey + '&' + searchType + '&' + search;
                // Account personal info
                dataContract['account']['info'] = url + json.account.personal_data + '/?' + apikey + '&' + account_id;

                console.log('2) setting dataContractService: ', dataContract);
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
            setDataContract: setDataContract
        };
});