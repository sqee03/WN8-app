'use strict';

angular.module('playerInfo')

.controller('playerInfoCtrl',
    function ($scope, playerIDService, playerInfoService) {

        console.info("- controller 'playerInfoCtrl' loaded");

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