'use strict';

angular.module('tankInfo')

.controller('tanksListCtrl',
    function ($scope, tankValuesService, WN8Service, growl, _) {
        /**
         * Feeds UI with list of player's tanks
         *
         * @memberOf module:tankInfo
         * @returns {Array} Detailed list of tanks and their values
         */
        function getTanksList() {
            // Get average and expected values for tank
            tankValuesService.getAllTanksValues().then(function(tanksValues) {
                $scope.tanksList = tanksValues.tanksList;
                $scope.tanksExpectedValues = tanksValues.expectedValues;
            }, function(error) {
                growl.error('Failed to load informations about player vehicles.');
            });
        };

        /**
         * Filter values for requested tank from collection
         *
         * @memberOf module:tankInfo
         * @param {Number} tank ID
         * @returns {Objects} filtered values for one tank
         * @TODO: Make sure that filtered results are always correct!
         */
        function filterCollection(collection, tankID) {
            // TODO: This could fail if tankID would match with some other stored value
            if (collection == $scope.tanksList) {
                // Search collection of average values
                return _.find(collection, tankID)[tankID];
            }
            if (collection == $scope.tanksExpectedValues) {
                // Search collection of expected values
                return _.find(collection, ['IDNum', tankID]);
            }
        };

        /**
         * Feeds UI with WN8
         *
         * @memberOf module:tankInfo
         * @param {Object} tank's average values
         * @param {Object} tank's expected values
         * @returns {Number} WN8
         */
        $scope.getWN8 = function(tankID) {

                // Get WN8 for tank
                WN8Service.calcTankWN8(
                    filterCollection($scope.tanksList, tankID),filterCollection($scope.tanksExpectedValues, tankID)
                    ).then(function(WN8) {
                    console.log('wn8: ', WN8);
                    // return WN8;
                }, function(error) {
                    growl.error('Failed to get WN8 for tank(id:' + tankID + ')');
                    // return '';
                });

        };

        // Init
        getTanksList()
});