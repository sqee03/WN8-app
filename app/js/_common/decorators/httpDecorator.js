'use strict';

angular.module('wotStats')

.decorator('$xhrFactory',
    function ($delegate, $injector) {
        /**
         * Decorator for HTTP requests
         *
         * @memberOf module:wotStats
         */
        return function(method, url) {
            var xhr = $delegate(method, url);
            var $http = $injector.get("$http");
            var callConfig = $http.pendingRequests[$http.pendingRequests.length - 1];
            if (angular.isFunction(callConfig.onProgress))
                xhr.addEventListener("progress", callConfig.onProgress);
            return xhr;
        };
});