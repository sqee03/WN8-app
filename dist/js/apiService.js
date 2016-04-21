'use strict';

angular.module('wotStats')

// API backend
.factory('apiCalls',
    function ($http, $q, configService) {

    	console.info("- service 'apiFactory' loaded");

        // Get data from API
        function getData(url) {
            console.log(url);
            var d = $q.defer();

            $http({
                    method: 'GET',
                    url: url
                })
                .success(function (data) {
                    console.info('Resolved API promise: ', data);
                    d.resolve(data);
                })
                .error(function (error) {
                    console.error('Server responded with error. Data could not be updated.');
                    d.reject(error);
                });

            return d.promise;
        };

    	return {
    		getData: getData
    	};

});