'use strict';

angular.module('playerInfo')

.controller('playerInfoCtrl',
    function ($scope, playerIDService, playerInfoService, moment) {
        // Variables
        $scope.playerInfo = null;

        function getPlayerInfo(playerID) {
            playerInfoService.getPlayerInfo(playerID).then(function(playerInfo) {
                $scope.playerInfo = playerInfo;
                $scope.createdAt = moment.unix(playerInfo.created_at).format('DD.MM.YYYY');
            }, function(error) {
                $scope.playerInfo = null;
            });
        };
});