'use strict';

angular.module('wotStats')

.controller('playerInfoCtrl',
    function ($scope, $q, playerService) {

        // console.info("- controller 'playerInfoCtrl' loaded");

        // Variables
        $scope.playerName = null;
        $scope.playerID = null;
        $scope.playerRating = null;

        // Get all informations about player
        $scope.getPlayerInfo = function(playerName) {
            console.log('called getPlayerInfo');

            if ($scope.playerID) {
                playerService.getPlayerRating($scope.playerID);
            }
            else {
                getPlayerID(playerName).then(function() {
                    $scope.getPlayerInfo(playerName);
                });
                // $scope.getPlayerInfo(playerName);
            }
        }

        // Get player ID
        function getPlayerID(playerName) {
            var d = $q.defer();

            if (playerName) {
                playerService.getPlayerID(playerName).then(function(resp) {
                    console.log('ID: ', resp);
                    $scope.playerID = resp;
                    d.resolve(resp);
                });
            }
            else {
                console.error('PlayerID is not defined yet. Player name is required in order to get ID.');
                d.reject(null);
            }

            return d.promise;
        };

        // Get player global rating (WG personal rating)
        function getPlayerRating(playerID) {
            playerService.getPlayerRating(playerID).then(function(resp) {
                console.log('Rating: ', resp);
                $scope.playerRating = resp;
            });
        };
});