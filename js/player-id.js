angular.module('myApp')

// get player ID
.factory('playerID', ['apiCalls', function (apiCalls) {

    console.log("- service 'playerID' loaded");

    // TO DO: load URL from config file
    var urlPlayerID = "https://api.worldoftanks.eu/wot/account/list/?application_id=9bd08e6ff7ffc96322e85e13cbd863c5&search=";

    var playerIDresponse;

    return {
        getPlayerID: function (playerName) {
            console.log("called getPlayerID");

            apiCalls.getData(urlPlayerID + playerName)
                .success(function (response) {
                    var playerBaseInfo = response;

                    if (playerBaseInfo.count != "0") {
                        // more than 1 player is matching searched text - using exact match
                        // nice to have: let user to manualy select nickname from list
                        playerIDresponse = response.data[0].account_id;
                        console.debug(playerIDresponse);
                    }
                    else {
                        console.debug("No player found.");
                    }
                })
                .error(function () {
                    // something
                    console.error("Ooooops. Something went wrong.");
                });

            return playerIDresponse;
            }
    }
}]);