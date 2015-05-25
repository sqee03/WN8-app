angular.module('myApp')

// get player Info
    .factory('playerInfo', ['apiCalls', function (apiCalls) {

        console.log("- service 'playerInfo' loaded");

        // TO DO: load URL from config file
        var urlTankInfo = "https://api.worldoftanks.eu/wot/encyclopedia/tankinfo/?application_id=9bd08e6ff7ffc96322e85e13cbd863c5&tank_id=";

        var statistics, globalRating, playerWR, battles, survivalRatio, avgDmg, avgFrag, avgSpot, avgDef, accountCreated, accountLastBattle, accountLogout;

        return {
            getPlayerInfo: function (playerID) {
                statistics = dataFromApi.data[playerID].statistics.all;

                // ratings
                globalRating = dataFromApi.data[playerID].global_rating;
                playerWR = (dataFromApi.data[playerID].statistics.all.wins / dataFromApi.data[playerID].statistics.all.battles) * 100;

                // player info
                battles = dataFromApi.data[playerID].statistics.all.battles;
                survivalRatio = (dataFromApi.data[playerID].statistics.all.survived_battles / dataFromApi.data[playerID].statistics.all.battles) * 100;

                // avg stats
                avgDmg = dataFromApi.data[playerID].statistics.all.damage_dealt / battles;
                avgFrag = dataFromApi.data[playerID].statistics.all.frags / battles;
                avgSpot = dataFromApi.data[playerID].statistics.all.spotted / battles;
                avgDef = dataFromApi.data[playerID].statistics.all.dropped_capture_points / battles;

                // account info
                accountCreated = dataFromApi.data[playerID].created_at * 1000;
                accountLastBattle = dataFromApi.data[playerID].last_battle_time * 1000;
                accountLogout = dataFromApi.data[playerID].logout_at * 1000;
            }
        }
    }]);