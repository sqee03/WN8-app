'use strict';

angular.module('notifications', [])

.config(
    function (growlProvider) {
        growlProvider.globalReversedOrder(true);
        growlProvider.globalDisableCountDown(true);
        growlProvider.globalTimeToLive({success: 3000, error: 5000, warning: 4000, info: 4000});
});