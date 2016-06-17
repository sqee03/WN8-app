'use strict';

angular.module('wotStats', [
        // Libraries
        'ui.router',
        'ngAnimate',
        'momentjs', // custom req. library
        'lodash', // custom req. library

        // Offlinejs
        'offlinejs',

        // Notifications
        'angular-growl',
        'notifications',

        // Template cache
        'templateCache',

        // Filters
        'filters',

        // App
        'playerSearch',
        'playerId',
        'playerInfo',
        'personalRating',
        'tankInfo',
        'tankAchievemetns',
        'WN8'
    ])

    .config(
        function($stateProvider, $urlRouterProvider) {

            // Routing
            $stateProvider
                // Init config files
                .state('app', {
                    abstract: true,
                    url: '',
                    template: '<ui-view/>',
                    resolve: {
                        config: function (configService) {
                            return configService.setConfig();
                        },
                        dataContract: function (dataContractService) {
                            dataContractService.setDataContract();
                        }
                    }
                })
                // Starting page
                .state('app.home', {
                    url: '/',
                    templateUrl: 'views/home.html'
                })
                // Player info
                .state('app.player', {
                    url: '/player',
                    templateUrl: 'views/player.html'
                })
                // Default redirect
                $urlRouterProvider.otherwise("/");
    });