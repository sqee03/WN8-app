'use strict';

angular.module('wotStats')

.controller('playerInfoCtrl',
    function ($scope, playerIDService) {

        console.info("- controller 'playerInfoCtrl' loaded");

        // Variables
        $scope.playerID = null;

        // Callable function for view
        $scope.getPlayerID = function(name) {
            playerIDService.getPlayerID(name).then(function(playerID) {
                $scope.playerID = playerID;
            });
        };
});