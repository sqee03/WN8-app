'use strict';

angular.module('wotStats')

// API backend
.factory('apiCalls',
    function ($http, $q, configService) {

    	console.info("- service 'apiFactory' loaded");

        // Get data contract
        // function getDataContract() {
        //     var d = $q.defer();

        //     $http({
        //             method: 'GET',
        //             url: 'json/wargamingDataContact.js'
        //         })
        //         .success(function (data) {
        //             d.resolve(data);
        //         })
        //         .error(function (error) {
        //             console.error('Server responded with error. Data could not be updated.');
        //             d.reject(error);
        //         });

        //     return d.promise;
        // };

        // Set API url
        // function setApiUrl(section) {
        //     dataContractService.getDataContract().then(function(dataContract) {
        //         return dataContract[section]
        //     });
        // };

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

    	// var getData = function (requestedURL) {
    	// 	return $http.get(requestedURL);
    	// };

    	return {
    		getData: function(url) {
                getData(url)
            }
    	};

});