'use strict';

angular.module('tankInfo')

.controller('tanksListCtrl',
    function ($scope, $rootScope, tankValuesService, tankAchievementsService, WN8Service, growl, _) {
        /* Variables */
        $scope.sortType = 'battles';
        $scope.sortReverse = true;

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
                        // var tankID = Number(Object.keys(averageValues)[0]);
                        var tankID = averageValues.tankID;
                        var expectedValues = filterCollection(tanksValues.expectedValues, tankID);
                        // var averageValues = filterCollection(averageValues, tankID);

                        // Skip WN8 calculation when expected values are not available for current tank
                        if (expectedValues) {
                            // Add WN8 for each vehicle within tanks list
                            getWN8(averageValues,expectedValues).then(function(wn8) {
                                averageValues['wn8'] = wn8;
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
         * @param {Array} collection of expected values
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
         * @param {Object} average values
         * @param {Object} expected values
         * @returns {Object} WN8 value and color
         */
        function getWN8(averageValues,expectedValues) {
                // Get WN8 for tank
                return WN8Service.calcTankWN8(averageValues,expectedValues).then(function(WN8) {
                    var wn8 = { 'value': WN8 };

                    WN8Service.setWN8RatingColor(WN8).then(function(color) {
                        wn8['color'] = color;
                    }, function(error) {
                        console.error('Failed to get color of WN8');
                    });

                    return wn8;
                }, function(error) {
                    growl.error('Failed to get WN8 for tank(id:' + tankID + ')');
                    return '';
                });
        };

        /**
         * Feeds UI with list of achievements
         *
         * @memberOf module:tankInfo
         * @returns {Array} List of tanks and their achievements
         */
        function getAchievements() {
                return tankAchievementsService.getAllTanksAchievements().then(function(achievements) {
                    $scope.achievements = achievements;

                    tankAchievementsService.getMoeTanks(achievements).then(function(tanksWithMOE) {
                        $scope.moeTanks = tanksWithMOE;

                        // Define default sort type for MOE list
                        $scope.sortTypeMoe = 'tier';
                    }, function(error) {
                        console.error('Failed to get list of tanks with Marks of excelence.');
                    });
                }, function(error) {
                    growl.error('Failed to get list of achievements.');
                });
        };

        /* Watcher for playerID changes */
        $rootScope.$watch('storedID', function (playerID) {
            console.log('playerID watcher triggered: ', playerID.id);
            getTanksList();
            getAchievements();
        });
});