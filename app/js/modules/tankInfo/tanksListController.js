'use strict';

angular.module('tankInfo')

.controller('tanksListCtrl',
    function ($scope, tankValuesService, WN8Service, growl) {
        /**
         * Feeds UI with list of player's tanks
         *
         * @memberOf module:tankInfo
         * @returns {Array} Detailed list of tanks and their values
         */
        function getTanksList() {
            // Get average and expected values for tank
            tankValuesService.getAllTanksValues().then(function(tanksValues) {
                console.log('tanksValues: ', tanksValues);
                $scope.tanksList = tanksValues.tanksList;
            }, function(error) {
                growl.error('Failed to load informations about player vehicles.');
            });
        };

        /**
         * Feeds UI with WN8
         *
         * @memberOf module:tankInfo
         * @param {Object} tank's average values
         * @param {Object} tank's expected values
         * @returns {Number} WN8
         */
        $scope.getWN8 = function(averageValues, tankID) {
            WN8Service.calcTankWN8(averageValues,expectedValues).then(function(WN8) {
                console.log('wn8: ', WN8);
                return WN8;
            }, function(error) {
                growl.error('Failed to get WN8 for tank(id:' + tankID + ')');
            });
        };

        // Init
        getTanksList()
});