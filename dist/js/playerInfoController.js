'use strict';

angular.module('playerInfo', [])

.controller('playerInfoCtrl',
    function ($scope, playerIDService, playerInfoService) {

        console.info("- controller 'playerInfoCtrl' loaded");

        // Variables
        $scope.playerID = null;

        // Callable function for view
        $scope.getPlayerID = function(name) {
            playerIDService.getPlayerID(name).then(function(playerID) {
                $scope.playerID = playerID;

                getPlayerInfo(playerID);
            });
        };

        function getPlayerInfo(playerID) {
            playerInfoService.getPlayerInfo(playerID).then(function(playerInfo) {
                $scope.playerInfo = playerInfo;
            });
        };
});