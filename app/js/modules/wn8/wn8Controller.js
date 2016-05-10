'use strict';

angular.module('WN8')

.controller('WN8Ctrl',
    function ($scope, WN8Service, growl) {

        console.info("- controller 'WN8Ctrl' loaded");

        // Mocks
        var mock = {
            tankID: 10
        };

        /**
         * Feeds UI with WN8 for requested tank
         *
         * @function tankWN8
         * @param {Number} tankID - ID of tank
         * @returns {Number} WN8 value for requested tank
         */
        function tankWN8(tankID) {
            WN8Service.getTankWN8(tankID).then(function(WN8) {
                $scope.tankWN8 = WN8;
            }, function(error) {
                growl.error('Failed to get WN8 for tank(id:' + tankID + ')');
            });
        };

        tankWN8(mock.tankID)
});