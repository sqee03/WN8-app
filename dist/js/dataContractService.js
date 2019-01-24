'use strict';

angular.module('wotStats')

.factory('dataContractService',
    function($http, configService, growl) {

        // console.info("- service 'dataContractService' loaded");

        // List of API Urls
        var dataContract = {
            'account': {},
            'tanks': { 'stats': {}, 'achievements': {} },
            'tankopedia': { 'description': {} },
            'expected_values': {}
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
                var url_account = json.api.uri + '/' + json.account.base_uri + '/';
                var url_tanks = json.api.uri + '/' + json.tanks.base_uri + '/';
                var url_tankopedia = json.api.uri + '/' + json.tankopedia.base_uri + '/';
                var apikey = json.api.key + '=' + getAPIkey();
                var account_id = json.account.account_id + '=';
                var personal_data = json.account.personal_data + '=';
                var search = json.api.search.key + '=';
                var searchType = json.api.search.type + '=' + getSearchType();

                // Account search
                dataContract['account']['search'] = url_account + json.account.list + '/?' + apikey + '&' + searchType + '&' + search;
                // Account personal info
                dataContract['account']['info'] = url_account + json.account.personal_data + '/?' + apikey + '&' + account_id;

                // Tank info
                dataContract['tanks']['stats']['url'] = url_tanks + json.tanks.statistics + '/?' + apikey + '&' + account_id;
                dataContract['tanks']['stats']['suffix'] = '&' + json.tanks.tank_id + '=';
                dataContract['tanks']['achievements']['url'] = url_tanks + json.tanks.achievements + '/?' + apikey + '&' + account_id;

                // Tankopedia
                dataContract['tankopedia']['description']['url'] = url_tankopedia + json.tankopedia.tankinfo + '/?' + apikey + '&' + json.tanks.tank_id + '=';
                // dataContract['tankopedia']['description']['suffix'] = '&' + json.tanks.tank_id + '=';
            }).error(function (error) {
                growl.error('Failed to load data contract');
            });

            // Expected tank values
            dataContract['expected_values'] = 'json/expected_tank_values_26.json';
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