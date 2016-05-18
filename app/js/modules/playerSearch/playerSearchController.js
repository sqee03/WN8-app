'use strict';

angular.module('playerSearch')

.controller('playerSearchCtrl',
    function ($scope, playerIDService, playerInfoService, moment) {
        // Variables
        $scope.playerID = null;

        // Callable function for view
        $scope.getPlayer = function(name) {
            getPlayerID(name);
        };

        function getPlayerID(name) {
            playerIDService.getPlayerID(name).then(function(playerID) {
                $scope.playerID = playerID;
            }, function(error) {
                $scope.playerID = null;
            });
        };
});