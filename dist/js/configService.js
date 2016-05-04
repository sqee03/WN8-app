'use strict';

angular.module('wotStats')

.factory('configService',
    function($http, growl) {

        // console.info("- service 'configService' loaded");

        var config = {};

        // SET config
        function setConfig() {
            $http.get('json/config.json').success(function(json) {
                config = json;
            }).error(function (error) {
                growl.error('Failed to load app config');
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