'use strict';

angular.module('WN8')

.controller('WN8Ctrl',
    function ($scope, WN8Service, tankValuesService, growl) {

        console.info("- controller 'WN8Ctrl' loaded");

        // Mocks
        var mock = {
            tankID: 9489 // e100
        };

        /**
         * Feeds UI with WN8 for requested tank
         *
         * @function tankWN8
         * @param {Number} tankID - ID of tank
         * @returns {Number} WN8 value for requested tank
         */
        function getTankWN8(tankID) {
            // Get average and expected values for tank
            tankValuesService.getTankValues(tankID).then(function(tankValues) {
                // Get WN8 for tank
                WN8Service.calcTankWN8(tankValues.averageValues,tankValues.expectedValues).then(function(WN8) {
                    $scope.tankWN8 = WN8;
                }, function(error) {
                    growl.error('Failed to get WN8 for tank(id:' + tankID + ')');
                });
            }, function(error) {
                growl.error('Failed to load average values for tank(id:' + tankID + ')');
            });
        };

        getTankWN8(mock.tankID)
});