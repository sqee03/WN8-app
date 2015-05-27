angular.module('myApp')

// get player ID
.factory('playerIDService', ['apiCalls', '$q', function (apiCalls, $q) {

    console.log("- service 'playerIDService' loaded");

    // TO DO: load URL from config file
    var urlPlayerID = "https://api.worldoftanks.eu/wot/account/list/?application_id=9bd08e6ff7ffc96322e85e13cbd863c5&type=exact&search=";

    return {
        getPlayerID: function (playerName) {
            var deferred = $q.defer();

            apiCalls.getData(urlPlayerID + playerName)
                .success(function (response) {
                    if(response.status != "error") {
                        deferred.resolve(response.data[0].account_id);
                    }
                    else {
                        deferred.resolve("Can find any player with this name. Try again.");
                    }
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
}]);