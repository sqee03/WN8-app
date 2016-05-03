'use strict';

angular.module('playerInfo')

.controller('playerInfoCtrl',
    function ($scope, playerIDService, playerInfoService, growl) {

        console.info("- controller 'playerInfoCtrl' loaded");

        // Growl notifications
        $scope.growl = function (type) {
            var config = {};
            switch (type) {
              case "success":
                growl.success("<b>I'm</b> a success message", config);
                break;
              case "info":
                growl.info("I'm an info message", config);
                break;
              case "warning":
                growl.warning("I'm the warning message", config);
                break;
              default:
                growl.error("Ups, error message here!", config);
            }
        };

        // Variables
        $scope.playerID = null;
        $scope.playerInfo = null;

        // Callable function for view
        $scope.getPlayer = function(name) {
            getPlayerID(name) // Start by fetching player ID
        };

        function getPlayerID(name) {
            playerIDService.getPlayerID(name).then(function(playerID) {
                $scope.playerID = playerID;

                // Fetch data when ID is ready
                getPlayerInfo(playerID);
            }, function(error) {
                $scope.playerID = null;
                $scope.playerInfo = null;
                console.error('Failed getting player ID: ', error);
            });
        };

        function getPlayerInfo(playerID) {
            playerInfoService.getPlayerInfo(playerID).then(function(playerInfo) {
                $scope.playerInfo = playerInfo;
            }, function(error) {
                $scope.playerInfo = null;
                console.error('Failed loading player info: ', error);
            });
        };
});