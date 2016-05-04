'use strict';

angular.module('momentjs', [])

.factory('moment',
    function ($window) {
        return $window.moment;
});