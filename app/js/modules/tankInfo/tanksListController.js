'use strict';

angular.module('tankInfo')

.controller('tanksListCtrl',
    function ($scope, $rootScope, tankValuesService, WN8Service, growl, _) {
        /**
         * Feeds UI with list of player's tanks
         *
         * @memberOf module:tankInfo
         * @returns {Array} Detailed list of tanks and their values
         */
        function getTanksList() {
            // Get average and expected values for tank
            tankValuesService.getAllTanksValues().then(function(tanksValues) {
                if (0 < tanksValues.tanksList.length) { // Check if list of tanks is not empty
                    _.forEach(tanksValues.tanksList, function(averageValues) {
                        var tankID = Number(Object.keys(averageValues)[0]);
                        var expectedValues = filterCollection(tanksValues.expectedValues, tankID);

                        // Skip WN8 calculation when expected values are not available for current tank
                        if (expectedValues) {
                            // Add WN8 for each vehicle within tanks list
                            getWN8(averageValues[tankID],expectedValues).then(function(wn8) {
                                averageValues[tankID]['wn8'] = wn8;
                            });
                        }
                    });
                    $scope.tanksList = tanksValues.tanksList;
                }
                else {
                    $scope.tanksList = 'Player has not participated in any battle yet.';
                }

                $scope.tanksExpectedValues = tanksValues.expectedValues;
            }, function(error) {
                growl.error('Failed to load informations about player vehicles.');
            });
        };

        /**
         * Check if value is an array
         *
         * @memberOf module:tankInfo
         * @private
         * @param {Any} any value
         * @returns {Boolean} true or false
         */
        $scope.isArray = function(array) {
            return angular.isArray(array);
        }

        /**
         * Filter values for requested tank from collection
         *
         * @memberOf module:tankInfo
         * @private
         * @param {Number} tank ID
         * @returns {Objects} filtered values for one tank
         * @TODO: Make sure that filtered results are always correct!
         */
        function filterCollection(collection, tankID) {
            // TODO: This could fail if tankID would match with some other stored value
            if (collection) {
                // Search collection of expected values
                return _.find(collection, ['IDNum', tankID]);
            }
            else {
                console.error('Collection for filtering is not defined');
            }
        };

        /**
         * Feeds UI with WN8
         *
         * @memberOf module:tankInfo
         * @param {Number} tank ID
         * @returns {String} WN8
         */
        function getWN8(averageValues,expectedValues) {
                // Get WN8 for tank
                return WN8Service.calcTankWN8(averageValues,expectedValues).then(function(WN8) {
                    return WN8;
                }, function(error) {
                    growl.error('Failed to get WN8 for tank(id:' + tankID + ')');
                    return '';
                });
        };

        /* Watcher */
        $rootScope.$watch('storedID', function (playerID) {
            console.log('playerID watcher triggered: ', playerID.id);
            getTanksList();
        });
});