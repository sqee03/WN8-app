'use strict';

angular.module('personalRating')

.controller('personalRatingCtrl',
    function ($scope, personalRatingService, growl) {

        console.info("- controller 'personalRatingCtrl' loaded");

        // Variables
        $scope.extendedRatingInfo = {};

        function getExtendedRatingInfo(rating) {
            personalRatingService.getPersonalRating(rating).then(function(extendedRatingInfo) {
                $scope.extendedRatingInfo = extendedRatingInfo;
            }, function(error) {
                $scope.extendedRatingInfo = null;
                growl.error('Failed to display player personal rating. Data are missing.');
            });
        };

        // Update player rating info when PR gets updated
        $scope.$watch('playerInfo.global_rating', function (newValue) {
            getExtendedRatingInfo($scope.playerInfo.global_rating);
        });
});