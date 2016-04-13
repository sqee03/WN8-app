'use strict';

angular.module('wotStats')

.factory('configService',
    function($http) {

        // console.info("- service 'configService' loaded");

        var config = {};

        // SET config
        function setConfig() {
            $http.get('json/config.json').success(function(json) {
                config = json;
            }).error(function (error) {
                console.error('Cannot load data app config.', error);
            });
        };

        // GET config
        function getConfig() {
            return config;
        };

        return {
            getConfig: getConfig,
            setConfig: setConfig
        };
});