'use strict';

angular.module('wotStats')

.controller('playerInfoCtrl',
    function ($scope, playerIDService) {

        console.info("- controller 'playerInfoCtrl' loaded");

        // Get player ID
        $scope.playerID = null;
        $scope.getPlayerID = function() {
            playerIDService.getPlayerID().then(function(resp) {
                $scope.playerID = resp;
                console.log('playerID: ', $scope.playerID);
            });
        };
});