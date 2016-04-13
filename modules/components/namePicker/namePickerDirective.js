'use strict';

angular.module('wotStats')

.directive('namepicker',
    function() {

        console.info("- directive 'namePicker' loaded");

        return {
            restrict: 'E',
            // replace: true,
            // templateUrl: 'modules/namePicker/namePicker.html',
            template: '<div>TEST</div>'
            // controller: 'namePickerCtrl',
            // link: function (scope) {
            //     // something
            //     console.log('namePicker Hello')
            // }
        };
});