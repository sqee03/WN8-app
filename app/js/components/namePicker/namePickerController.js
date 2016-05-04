'use strict';

angular.module('wotStats')

.controller('namePickerCtrl',
    function ($scope, playerService) {

        // console.info("- controller 'playerNameInputCtrl' loaded");

        // Variables
        $scope.playerName = null;

        $scope.$watch('playerName', function (newName, oldName) {
            if (oldName != null) {
                console.info('name updated: ', newName);
            }
        });
});