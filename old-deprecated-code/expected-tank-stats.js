'use strict';

angular.module('wotStats')

// get expected tank stats(values)
    .factory('expectedTankStats', ['apiCalls', function (apiCalls) {

        console.log("- service 'expectedTankStats' loaded");

        // TO DO: load URL from config file
        var urlPlayerID = "https://api.worldoftanks.eu/wot/account/list/?application_id=9bd08e6ff7ffc96322e85e13cbd863c5&search=";

        // Default variable pre-set
        var loaded2 = null;
        var expectedData = null;

        var expDmg = null;
        var expFrag = null;
        var expSpot = null;
        var expDef = null;
        var expWinRate = null;

        return {
            getExpectedStats: function(tankID) {
                if (loaded2 == null) // continue if variable is not defined yet
                    loaded2 = apiCalls.getData(urlExpextedTankValues) // call API backend
                        .then(function(backendResponse) { // use API response to define variable

                            expectedData = backendResponse.data.data[1]; // need to provide proper number for returning tank stats

                            var searchSource = backendResponse.data.data;
                            var newData = null;

                            var updateData = searchJSON.findObj(searchSource,'IDNum','16641').then(function(searchResults) {
                                console.debug("search results: " + searchResults);
                                newData = searchResults;
                            });

                            // temporary saving filtered API data
                            expDmg = expectedData.expDamage;
                            expFrag = expectedData.expFrag;
                            expSpot = expectedData.expSpot;
                            expDef = expectedData.expDef;
                            expWinRate = expectedData.expWinRate;

                            console.debug("expected values(local JSON) for '" + tankID + "': expDmg:" + expDmg + ", expFrag:" + expFrag + ", expSpot:" + expSpot + ", expDef:" + expDef + ", expWinRate:" + expWinRate);
                        });

                console.log("loaded 'loadExpectedStats'");

                return loaded2; // return redefined variable
            }
        }
    }]);