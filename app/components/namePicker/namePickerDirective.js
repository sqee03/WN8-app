'use strict';

angular.module('wotStats')

.directive('namepicker',
    function() {

        console.info("- directive 'namePicker' loaded");

        return {
            restrict: 'E',
            replace: true,
            template: '<div>TEST</div>',
            // templateUrl: 'modules/components/namePicker/namePicker.html',
            controller: 'namePickerCtrl',
            link: function (scope) {
                // something
                console.log('namePicker Hello')
            }
        };
});