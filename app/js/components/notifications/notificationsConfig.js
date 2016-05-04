'use strict';

angular.module('notifications', [])

.config(
    function (growlProvider) {
        growlProvider.globalReversedOrder(true);
        growlProvider.globalDisableCountDown(true);
        growlProvider.globalTimeToLive({success: 4000, error: 7000, warning: 5000, info: 5000});
});