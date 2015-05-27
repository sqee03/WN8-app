angular.module('myApp')

// service for reading and storing data in config JSON file
    .factory('projectService', ['$http', '$q', function ($http, $q) {

        console.log("- service 'projectService' loaded");

        var requestedURL = 'json/config.json';

        return {
            loadConfig: function(requestedURL) {
                var deferred = $q.defer();

                $http.get(requestedURL).
                    success(function (data) {
                        // this callback will be called asynchronously
                        // when the response is available
                        console.error(data);
                        deferred.resolve(data);
                    }).
                    error(function (data) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        console.error("ooops");
                    });

                return deferred.promise;
            },
            modifyConfig: function() {
                $http.post('json/config.json', {msg:'hello word!'}).
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        console.debug("saved");
                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }
        }
    }]);