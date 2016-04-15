'use strict';

angular.module('wotStats')

.factory('dataContractService',
    function($http, configService) {

        console.info("- service 'dataContractService' loaded");

        // List of API Urls
        var dataContract = {
            'account': {
                'info': 'xxx'
            }
        };

        // Get API key
        function getAPIkey() {
            return configService.getConfig().app_id.eu;
        };

        // SET data contract
        function setDataContract() {
            $http.get('json/wargamingDataContract.json').success(function(json) {
                console.info("key: ", getAPIkey());
                dataContract['account']['search'] = json.api.uri + '/' + json.account.base_uri + '/' + json.account.list + '/?' + json.api.key + '=' + getAPIkey() + '&' + json.api.search + '=';
                //dataContract['account']['list'] = json.api.uri + '/' + json.account.base_uri + '/' + json.account.list;
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